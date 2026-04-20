import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    overview(): Promise<{
        serviceId: string;
        serviceName: string;
        queueLength: number;
        avgServiceTime: number;
        estimatedWaitingTime: number;
        status: import("@prisma/client").$Enums.ServiceStatus;
    }[]>;
}
