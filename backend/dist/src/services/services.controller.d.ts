import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        location: string;
        avgServiceTime: number;
        status: import("@prisma/client").$Enums.ServiceStatus;
        slotDuration: number;
        slotCapacity: number;
        openingTime: string;
        closingTime: string;
        currentQueueLength: number;
        currentToken: number;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ServiceClient<({
        slots: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.SlotStatus;
            startTime: Date;
            serviceId: string;
            endTime: Date;
            capacity: number;
            booked: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        location: string;
        avgServiceTime: number;
        status: import("@prisma/client").$Enums.ServiceStatus;
        slotDuration: number;
        slotCapacity: number;
        openingTime: string;
        closingTime: string;
        currentQueueLength: number;
        currentToken: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    create(body: CreateServiceDto): import("@prisma/client").Prisma.Prisma__ServiceClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        location: string;
        avgServiceTime: number;
        status: import("@prisma/client").$Enums.ServiceStatus;
        slotDuration: number;
        slotCapacity: number;
        openingTime: string;
        closingTime: string;
        currentQueueLength: number;
        currentToken: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, body: UpdateServiceDto): import("@prisma/client").Prisma.Prisma__ServiceClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        location: string;
        avgServiceTime: number;
        status: import("@prisma/client").$Enums.ServiceStatus;
        slotDuration: number;
        slotCapacity: number;
        openingTime: string;
        closingTime: string;
        currentQueueLength: number;
        currentToken: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
