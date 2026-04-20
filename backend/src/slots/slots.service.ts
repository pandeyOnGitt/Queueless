import { Injectable } from '@nestjs/common';
import { SlotStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSlotDto } from './dto/create-slot.dto';

@Injectable()
export class SlotsService {
  constructor(private readonly prisma: PrismaService) {}

  findByService(serviceId: string, date?: string) {
    const start = date ? new Date(`${date}T00:00:00.000Z`) : undefined;
    const end = date ? new Date(`${date}T23:59:59.999Z`) : undefined;

    return this.prisma.slot.findMany({
      where: {
        serviceId,
        ...(start && end
          ? {
              startTime: {
                gte: start,
                lte: end,
              },
            }
          : {}),
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async create(payload: CreateSlotDto) {
    const service = await this.prisma.service.findUnique({
      where: { id: payload.serviceId },
    });

    return this.prisma.slot.create({
      data: {
        serviceId: payload.serviceId,
        startTime: new Date(payload.startTime),
        endTime: new Date(payload.endTime),
        capacity: payload.capacity ?? service?.slotCapacity ?? 1,
        status: SlotStatus.AVAILABLE,
      },
    });
  }
}
