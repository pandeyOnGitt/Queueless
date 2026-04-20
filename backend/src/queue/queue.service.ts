import { Injectable } from '@nestjs/common';
import { QueueEventType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { UpdateQueueDto } from './dto/update-queue.dto';

@Injectable()
export class QueueService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  async getServiceQueue(serviceId: string) {
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) {
      return null;
    }
    return {
      serviceId,
      currentQueueLength: service.currentQueueLength,
      currentToken: service.currentToken,
      avgServiceTime: service.avgServiceTime,
      estimatedWaitingTime: service.currentQueueLength * service.avgServiceTime,
      status: service.status,
    };
  }

  async updateServiceQueue(serviceId: string, body: UpdateQueueDto) {
    const updatedService = await this.prisma.service.update({
      where: { id: serviceId },
      data: {
        ...(body.currentQueueLength !== undefined
          ? { currentQueueLength: body.currentQueueLength }
          : {}),
        ...(body.currentToken !== undefined ? { currentToken: body.currentToken } : {}),
        ...(body.status !== undefined ? { status: body.status } : {}),
      },
    });

    await this.prisma.queueLog.create({
      data: {
        serviceId,
        eventType: QueueEventType.STATUS_UPDATED,
        queueLength: updatedService.currentQueueLength,
        currentToken: updatedService.currentToken,
        note: body.note,
      },
    });

    const payload = {
      serviceId,
      currentQueueLength: updatedService.currentQueueLength,
      currentToken: updatedService.currentToken,
      avgServiceTime: updatedService.avgServiceTime,
      estimatedWaitingTime:
        updatedService.currentQueueLength * updatedService.avgServiceTime,
      status: updatedService.status,
    };

    this.websocketGateway.publishQueueUpdate(serviceId, payload);
    return payload;
  }
}
