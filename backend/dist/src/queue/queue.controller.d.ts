import { UpdateQueueDto } from './dto/update-queue.dto';
import { QueueService } from './queue.service';
export declare class QueueController {
    private readonly queueService;
    constructor(queueService: QueueService);
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
