import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    dashboard(): Promise<{
        totalServices: number;
        totalBookings: number;
        activeBookings: number;
        availableSlots: number;
    }>;
    getUsers(search?: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string;
        fullName: string;
        roleId: number;
        isActive: boolean;
        createdAt: Date;
    }[]>;
    getUserById(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        fullName: string;
        roleId: number;
        isActive: boolean;
        createdAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateUserStatus(id: string, isActive: boolean): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        fullName: string;
        roleId: number;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getBookings(search?: string): import("@prisma/client").Prisma.PrismaPromise<({
        user: {
            email: string;
            fullName: string;
        };
        service: {
            name: string;
        };
        slot: {
            startTime: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.BookingStatus;
        serviceId: string;
        slotId: string;
        bookingToken: number;
        estimatedWaitTime: number;
        userId: string;
    })[]>;
}
