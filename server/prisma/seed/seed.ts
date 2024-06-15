import { PrismaClient } from '@prisma/client';
import { CreateAccountDto } from 'src/auth/dto/create-account.dto';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedDefualtUser() {
  console.log('start seeding defualt account');
  const users: CreateAccountDto[] = [
    {
      username: 'defualt@admin',
      password: '123456789',
      admin: true,
    },
    {
      username: 'defualt@user',
      password: '123456789',
      admin: false,
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: {
        username: user.username,
        isAdmin: user.admin,
        password: await bcrypt.hash(user.password, 10),
      },
    });
    console.log('created :', user.username);
  }
}
async function main() {
  console.log('start seeding ---------------');
}
main()
  .then(seedDefualtUser)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
