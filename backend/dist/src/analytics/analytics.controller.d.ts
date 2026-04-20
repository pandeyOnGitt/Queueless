import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    overview(): Promise<{
        serviceId: string;
        serviceName: string;
        queueLength: number;
        avgServiceTime: number;
        estimatedWaitingTime: number;
        status: import("@prisma/client").$Enums.ServiceStatus;
    }[]>;
}
