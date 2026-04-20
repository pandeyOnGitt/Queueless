"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
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
    async createUser(payload) {
        const existing = await this.prisma.user.findUnique({
            where: { email: payload.email },
            select: { id: true },
        });
        if (existing) {
            throw new common_1.BadRequestException('Email already in use');
        }
        const passwordHash = await bcrypt.hash(payload.password, 10);
        return this.prisma.user.create({
            data: {
                fullName: payload.fullName,
                email: payload.email,
                passwordHash,
                roleId: payload.roleId,
                isActive: payload.isActive ?? true,
            },
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