import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(user: {
        id: string;
    }, body: CreateBookingDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.BookingStatus;
        serviceId: string;
        slotId: string;
        bookingToken: number;
        estimatedWaitTime: number;
        userId: string;
    }>;
    myBookings(user: {
        id: string;
    }): import("@prisma/client").Prisma.PrismaPromise<({
        service: {
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
        };
        slot: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.SlotStatus;
            startTime: Date;
            serviceId: string;
            endTime: Date;
            capacity: number;
            booked: number;
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
