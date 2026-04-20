import { BookingStatus, SlotStatus } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  dashboard() {
    return Promise.all([
      this.prisma.service.count(),
      this.prisma.booking.count(),
      this.prisma.booking.count({ where: { status: BookingStatus.BOOKED } }),
      this.prisma.slot.count({ where: { status: SlotStatus.AVAILABLE } }),
    ]).then(([totalServices, totalBookings, activeBookings, availableSlots]) => ({
      totalServices,
      totalBookings,
      activeBookings,
      availableSlots,
    }));
  }

  getUsers(search?: string) {
    return this.prisma.user.findMany({
      where: search
        ? {
            OR: [
              { email: { contains: search, mode: 'insensitive' } },
              { fullName: { contains: search, mode: 'insensitive' } },
            ],
          }
        : undefined,
      select: {
        id: true,
        fullName: true,
        email: true,
        roleId: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        roleId: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  updateUserStatus(id: string, isActive: boolean) {
    return this.prisma.user.update({
      where: { id },
      data: { isActive },
      select: {
        id: true,
        fullName: true,
        email: true,
        roleId: true,
        isActive: true,
      },
    });
  }

  getBookings(search?: string) {
    return this.prisma.booking.findMany({
      where: search
        ? {
            OR: [
              { service: { name: { contains: search, mode: 'insensitive' } } },
              { user: { email: { contains: search, mode: 'insensitive' } } },
            ],
          }
        : undefined,
      include: {
        service: { select: { name: true } },
        user: { select: { email: true, fullName: true } },
        slot: { select: { startTime: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
