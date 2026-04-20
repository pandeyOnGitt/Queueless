import { AdminService } from './admin.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    dashboard(): Promise<{
        totalServices: number;
        totalBookings: number;
        activeBookings: number;
        availableSlots: number;
    }>;
    users(search?: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string;
        fullName: string;
        roleId: number;
        isActive: boolean;
        createdAt: Date;
    }[]>;
    createUser(body: CreateAdminUserDto): Promise<{
        id: string;
        email: string;
        fullName: string;
        roleId: number;
        isActive: boolean;
        createdAt: Date;
    }>;
    userById(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        fullName: string;
        roleId: number;
        isActive: boolean;
        createdAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    userStatus(id: string, body: UpdateUserStatusDto): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        fullName: string;
        roleId: number;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    bookings(search?: string): import("@prisma/client").Prisma.PrismaPromise<({
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
