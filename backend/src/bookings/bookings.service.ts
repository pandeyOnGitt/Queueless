import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingStatus, SlotStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  async create(userId: string, payload: CreateBookingDto) {
    return this.prisma.$transaction(async (tx) => {
      const [service, slot] = await Promise.all([
        tx.service.findUnique({ where: { id: payload.serviceId } }),
        tx.slot.findUnique({ where: { id: payload.slotId } }),
      ]);

      if (!service || !slot) {
        throw new BadRequestException('Invalid service or slot');
      }
      if (slot.serviceId !== payload.serviceId) {
        throw new BadRequestException('Slot does not belong to service');
      }
      if (slot.booked >= slot.capacity) {
        throw new BadRequestException('Slot is full');
      }

      const tokenResult = await tx.booking.aggregate({
        where: { serviceId: payload.serviceId },
        _max: { bookingToken: true },
      });
      const bookingToken = (tokenResult._max.bookingToken ?? service.currentToken) + 1;
      const estimatedWaitTime = service.currentQueueLength * service.avgServiceTime;

      const booking = await tx.booking.create({
        data: {
          userId,
          serviceId: payload.serviceId,
          slotId: payload.slotId,
          bookingToken,
          status: BookingStatus.BOOKED,
          estimatedWaitTime,
        },
      });

      const updatedSlot = await tx.slot.update({
        where: { id: payload.slotId },
        data: {
          booked: { increment: 1 },
        },
      });

      if (updatedSlot.booked >= updatedSlot.capacity) {
        await tx.slot.update({
          where: { id: payload.slotId },
          data: { status: SlotStatus.FULL },
        });
      }

      await tx.service.update({
        where: { id: payload.serviceId },
        data: { currentQueueLength: { increment: 1 } },
      });

      this.websocketGateway.publishQueueUpdate(payload.serviceId, {
        serviceId: payload.serviceId,
        currentQueueLength: service.currentQueueLength + 1,
        currentToken: service.currentToken,
        avgServiceTime: service.avgServiceTime,
        estimatedWaitingTime: (service.currentQueueLength + 1) * service.avgServiceTime,
        status: service.status,
      });

      return booking;
    });
  }

  getMyBookings(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        service: true,
        slot: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
