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
exports.AdminService = void 0;
const client_1 = require("@prisma/client");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    dashboard() {
        return Promise.all([
            this.prisma.service.count(),
            this.prisma.booking.count(),
            this.prisma.booking.count({ where: { status: client_1.BookingStatus.BOOKED } }),
            this.prisma.slot.count({ where: { status: client_1.SlotStatus.AVAILABLE } }),
        ]).then(([totalServices, totalBookings, activeBookings, availableSlots]) => ({
            totalServices,
            totalBookings,
            activeBookings,
            availableSlots,
        }));
    }
    getUsers(search) {
        return this.prisma.user.findMany({
            where: search
                ? {
                    OR: [
                        { email: { contains: search, mode: 'insensitive' } },
                        { fullName: { contains: search, mode: 'insensitive' } },
                    ],
                }
                : undefined,
            select: {
                id: true,
                fullName: true,
                email: true,
                roleId: true,
                isActive: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    getUserById(id) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                fullName: true,
                email: true,
                roleId: true,
                isActive: true,
                createdAt: true,
            },
        });
    }
    updateUserStatus(id, isActive) {
        return this.prisma.user.update({
            where: { id },
            data: { isActive },
            select: {
                id: true,
                fullName: true,
                email: true,
                roleId: true,
                isActive: true,
            },
        });
    }
    getBookings(search) {
        return this.prisma.booking.findMany({
            where: search
                ? {
                    OR: [
                        { service: { name: { contains: search, mode: 'insensitive' } } },
                        { user: { email: { contains: search, mode: 'insensitive' } } },
                    ],
                }
                : undefined,
            include: {
                service: { select: { name: true } },
                user: { select: { email: true, fullName: true } },
                slot: { select: { startTime: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map