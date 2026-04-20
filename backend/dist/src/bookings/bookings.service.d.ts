import { PrismaService } from '../prisma/prisma.service';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { CreateBookingDto } from './dto/create-booking.dto';
export declare class BookingsService {
    private readonly prisma;
    private readonly websocketGateway;
    constructor(prisma: PrismaService, websocketGateway: WebsocketGateway);
    create(userId: string, payload: CreateBookingDto): Promise<{
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
    getMyBookings(userId: string): import("@prisma/client").Prisma.PrismaPromise<({
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
