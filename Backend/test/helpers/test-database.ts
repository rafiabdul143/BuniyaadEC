import { PrismaService } from '../../src/prisma/prisma.service';

export async function cleanTestDatabase(prisma: PrismaService, emailPrefix = 'test.integration.') {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('cleanTestDatabase must only be run in the test environment');
  }

  // Also check if the URL ends with test DB
  if (!process.env.DATABASE_URL?.includes('_test')) {
    throw new Error('Test environment must use a test database ending in _test');
  }

  try {
    const users = await prisma.user.findMany({
      where: { email: { contains: emailPrefix } },
      select: { id: true },
    });
    const userIds = users.map((u) => u.id);

    if (userIds.length > 0) {
      await prisma.userRole.deleteMany({ where: { userId: { in: userIds } } });
      await prisma.refreshToken.deleteMany({ where: { userId: { in: userIds } } });
      await prisma.emailVerification.deleteMany({ where: { userId: { in: userIds } } });
      await prisma.passwordResetToken.deleteMany({ where: { userId: { in: userIds } } });
      await prisma.user.deleteMany({ where: { id: { in: userIds } } });
    }
  } catch (error) {
    console.error('Database cleanup failed:', error);
  }
}