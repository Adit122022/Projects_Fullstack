import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@ncomputing.in';
  
  // Clean up existing admin to ensure it seeds with the correct Account relationship
  await prisma.user.deleteMany({
    where: { email: adminEmail }
  });

  const passwordHash = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.create({
    data: {
      id: 'admin-user-id',
      email: adminEmail,
      passwordHash,
      name: 'NComputing Admin',
      role: 'ADMIN',
      emailVerified: true
    }
  });

  await prisma.account.create({
    data: {
      id: 'admin-account-id',
      accountId: 'admin-user-id',
      providerId: 'email',
      userId: 'admin-user-id',
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
  console.log('Seeded Admin User & Better Auth Account:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
