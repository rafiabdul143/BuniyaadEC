import { PrismaService } from '../../src/prisma/prisma.service';

export async function cleanTestDatabase(prisma: PrismaService, emailPrefix = 'test.integration.') {
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