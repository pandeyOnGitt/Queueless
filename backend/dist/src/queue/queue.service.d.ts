import { PrismaService } from '../prisma/prisma.service';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { UpdateQueueDto } from './dto/update-queue.dto';
export declare class QueueService {
    private readonly prisma;
    private readonly websocketGateway;
    constructor(prisma: PrismaService, websocketGateway: WebsocketGateway);
    getServiceQueue(serviceId: string): Promise<{
        serviceId: string;
        currentQueueLength: number;
        currentToken: number;
        avgServiceTime: number;
        estimatedWaitingTime: number;
        status: import("@prisma/client").$Enums.ServiceStatus;
    } | null>;
    updateServiceQueue(serviceId: string, body: UpdateQueueDto): Promise<{
        serviceId: string;
        currentQueueLength: number;
        currentToken: number;
        avgServiceTime: number;
        estimatedWaitingTime: number;
        status: import("@prisma/client").$Enums.ServiceStatus;
    }>;
}
