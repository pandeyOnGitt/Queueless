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
exports.SlotsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let SlotsService = class SlotsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findByService(serviceId, date) {
        const start = date ? new Date(`${date}T00:00:00.000Z`) : undefined;
        const end = date ? new Date(`${date}T23:59:59.999Z`) : undefined;
        return this.prisma.slot.findMany({
            where: {
                serviceId,
                ...(start && end
                    ? {
                        startTime: {
                            gte: start,
                            lte: end,
                        },
                    }
                    : {}),
            },
            orderBy: { startTime: 'asc' },
        });
    }
    async create(payload) {
        const service = await this.prisma.service.findUnique({
            where: { id: payload.serviceId },
        });
        return this.prisma.slot.create({
            data: {
                serviceId: payload.serviceId,
                startTime: new Date(payload.startTime),
                endTime: new Date(payload.endTime),
                capacity: payload.capacity ?? service?.slotCapacity ?? 1,
                status: client_1.SlotStatus.AVAILABLE,
            },
        });
    }
};
exports.SlotsService = SlotsService;
exports.SlotsService = SlotsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SlotsService);
//# sourceMappingURL=slots.service.js.map