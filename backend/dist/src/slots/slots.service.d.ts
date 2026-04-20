import { PrismaService } from '../prisma/prisma.service';
import { CreateSlotDto } from './dto/create-slot.dto';
export declare class SlotsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByService(serviceId: string, date?: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.SlotStatus;
        startTime: Date;
        serviceId: string;
        endTime: Date;
        capacity: number;
        booked: number;
    }[]>;
    create(payload: CreateSlotDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.SlotStatus;
        startTime: Date;
        serviceId: string;
        endTime: Date;
        capacity: number;
        booked: number;
    }>;
}
