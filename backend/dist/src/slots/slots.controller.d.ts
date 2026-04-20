import { CreateSlotDto } from './dto/create-slot.dto';
import { SlotsService } from './slots.service';
export declare class SlotsController {
    private readonly slotsService;
    constructor(slotsService: SlotsService);
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
    create(body: CreateSlotDto): Promise<{
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
