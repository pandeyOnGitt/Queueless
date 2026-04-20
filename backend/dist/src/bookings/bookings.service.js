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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const websocket_gateway_1 = require("../websocket/websocket.gateway");
let BookingsService = class BookingsService {
    prisma;
    websocketGateway;
    constructor(prisma, websocketGateway) {
        this.prisma = prisma;
        this.websocketGateway = websocketGateway;
    }
    async create(userId, payload) {
        return this.prisma.$transaction(async (tx) => {
            const [service, slot] = await Promise.all([
                tx.service.findUnique({ where: { id: payload.serviceId } }),
                tx.slot.findUnique({ where: { id: payload.slotId } }),
            ]);
            if (!service || !slot) {
                throw new common_1.BadRequestException('Invalid service or slot');
            }
            if (slot.serviceId !== payload.serviceId) {
                throw new common_1.BadRequestException('Slot does not belong to service');
            }
            if (slot.booked >= slot.capacity) {
                throw new common_1.BadRequestException('Slot is full');
            }
            const tokenResult = await tx.booking.aggregate({
                where: { serviceId: payload.serviceId },
                _max: { bookingToken: true },
            });
            const bookingToken = (tokenResult._max.bookingToken ?? service.currentToken) + 1;
            const estimatedWaitTime = service.currentQueueLength * service.avgServiceTime;
            const booking = await tx.booking.create({
                data: {
                    userId,
                    serviceId: payload.serviceId,
                    slotId: payload.slotId,
                    bookingToken,
                    status: client_1.BookingStatus.BOOKED,
                    estimatedWaitTime,
                },
            });
            const updatedSlot = await tx.slot.update({
                where: { id: payload.slotId },
                data: {
                    booked: { increment: 1 },
                },
            });
            if (updatedSlot.booked >= updatedSlot.capacity) {
                await tx.slot.update({
                    where: { id: payload.slotId },
                    data: { status: client_1.SlotStatus.FULL },
                });
            }
            await tx.service.update({
                where: { id: payload.serviceId },
                data: { currentQueueLength: { increment: 1 } },
            });
            this.websocketGateway.publishQueueUpdate(payload.serviceId, {
                serviceId: payload.serviceId,
                currentQueueLength: service.currentQueueLength + 1,
                currentToken: service.currentToken,
                avgServiceTime: service.avgServiceTime,
                estimatedWaitingTime: (service.currentQueueLength + 1) * service.avgServiceTime,
                status: service.status,
            });
            return booking;
        });
    }
    getMyBookings(userId) {
        return this.prisma.booking.findMany({
            where: { userId },
            include: {
                service: true,
                slot: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        websocket_gateway_1.WebsocketGateway])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map