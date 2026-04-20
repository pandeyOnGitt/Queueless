import { ServiceStatus } from '@prisma/client';
export declare class CreateServiceDto {
    name: string;
    description: string;
    location: string;
    avgServiceTime: number;
    status: ServiceStatus;
    slotDuration: number;
    slotCapacity: number;
    openingTime: string;
    closingTime: string;
}
