import { ServiceStatus } from '@prisma/client';
export declare class UpdateQueueDto {
    currentQueueLength?: number;
    currentToken?: number;
    status?: ServiceStatus;
    note?: string;
}
