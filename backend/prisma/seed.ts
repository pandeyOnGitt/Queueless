import { PrismaClient, ServiceStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ROLE } from '../src/auth/constants/role.constants';

const prisma = new PrismaClient();

async function main() {
  const adminPasswordHash = await bcrypt.hash('Admin@123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@queueless.com' },
    update: {
      fullName: 'QueueLess Admin',
      passwordHash: adminPasswordHash,
      roleId: ROLE.ADMIN,
      isActive: true,
    },
    create: {
      fullName: 'QueueLess Admin',
      email: 'admin@queueless.com',
      passwordHash: adminPasswordHash,
      roleId: ROLE.ADMIN,
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
        status: ServiceStatus.OPEN,
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
        status: ServiceStatus.BUSY,
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
        status: ServiceStatus.OPEN,
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
