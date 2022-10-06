import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testUsers = [
  {
    firstName: 'Aapo',
    lastName: 'Kallio',
    email: 'aapo.kallio@gmail.com',
    groups: [],
    predictions: [],
  },
];

async function main() {
  await prisma.user.createMany({
    data: testUsers,
  });
}

main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
