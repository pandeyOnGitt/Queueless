import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async overview() {
    const services = await this.prisma.service.findMany();
    return services.map((service) => ({
      serviceId: service.id,
      serviceName: service.name,
      queueLength: service.currentQueueLength,
      avgServiceTime: service.avgServiceTime,
      estimatedWaitingTime: service.currentQueueLength * service.avgServiceTime,
      status: service.status,
    }));
  }
}
