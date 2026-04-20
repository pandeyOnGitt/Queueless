"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const websocket_gateway_1 = require("../websocket/websocket.gateway");
let QueueService = class QueueService {
    prisma;
    websocketGateway;
    constructor(prisma, websocketGateway) {
        this.prisma = prisma;
        this.websocketGateway = websocketGateway;
    }
    async getServiceQueue(serviceId) {
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
    async updateServiceQueue(serviceId, body) {
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
                eventType: client_1.QueueEventType.STATUS_UPDATED,
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
            estimatedWaitingTime: updatedService.currentQueueLength * updatedService.avgServiceTime,
            status: updatedService.status,
        };
        this.websocketGateway.publishQueueUpdate(serviceId, payload);
        return payload;
    }
};
exports.QueueService = QueueService;
exports.QueueService = QueueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        websocket_gateway_1.WebsocketGateway])
], QueueService);
//# sourceMappingURL=queue.service.js.map