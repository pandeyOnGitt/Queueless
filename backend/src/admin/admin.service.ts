import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingStatus, SlotStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';

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

  async createUser(payload: CreateAdminUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: payload.email },
      select: { id: true },
    });
    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(payload.password, 10);
    return this.prisma.user.create({
      data: {
        fullName: payload.fullName,
        email: payload.email,
        passwordHash,
        roleId: payload.roleId,
        isActive: payload.isActive ?? true,
      },
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
