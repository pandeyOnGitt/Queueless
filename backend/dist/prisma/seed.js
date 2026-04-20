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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const role_constants_1 = require("../src/auth/constants/role.constants");
const prisma = new client_1.PrismaClient();
async function main() {
    const adminPasswordHash = await bcrypt.hash('Admin@123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@queueless.com' },
        update: {
            fullName: 'QueueLess Admin',
            passwordHash: adminPasswordHash,
            roleId: role_constants_1.ROLE.ADMIN,
            isActive: true,
        },
        create: {
            fullName: 'QueueLess Admin',
            email: 'admin@queueless.com',
            passwordHash: adminPasswordHash,
            roleId: role_constants_1.ROLE.ADMIN,
            isActive: true,
        },
    });
    await prisma.service.createMany({
        data: [
            {
                name: 'College Office - Certificates',
                description: 'Document verification and certificate processing.',
                location: 'Admin Block - Room 101',
                avgServiceTime: 8,
                currentQueueLength: 12,
                currentToken: 204,
                status: client_1.ServiceStatus.OPEN,
                slotDuration: 15,
                slotCapacity: 5,
                openingTime: '09:00',
                closingTime: '17:00',
            },
            {
                name: 'Hospital OPD Registration',
                description: 'Patient registration and token generation.',
                location: 'Ground Floor Desk',
                avgServiceTime: 5,
                currentQueueLength: 18,
                currentToken: 540,
                status: client_1.ServiceStatus.BUSY,
                slotDuration: 10,
                slotCapacity: 8,
                openingTime: '08:00',
                closingTime: '20:00',
            },
            {
                name: 'Bank Account Services',
                description: 'Account opening, KYC and passbook updates.',
                location: 'City Branch Counter A',
                avgServiceTime: 10,
                currentQueueLength: 7,
                currentToken: 89,
                status: client_1.ServiceStatus.OPEN,
                slotDuration: 20,
                slotCapacity: 4,
                openingTime: '10:00',
                closingTime: '16:00',
            },
        ],
        skipDuplicates: true,
    });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map