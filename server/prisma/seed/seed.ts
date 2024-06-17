import { PrismaClient } from '@prisma/client';
import { CreateAccountDto } from 'src/auth/dto/create-account.dto';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedDefaultUser() {
  console.log('start seeding default account');
  const users: CreateAccountDto[] = [
    {
      username: 'default@admin',
      password: '123456789',
      admin: true,
    },
    {
      username: 'default@user1',
      password: '123456789',
      admin: false,
    },
    {
      username: 'default@user2',
      password: '123456789',
      admin: false,
    },
    {
      username: 'default@user3',
      password: '123456789',
      admin: false,
    },
    {
      username: 'default@user4',
      password: '123456789',
      admin: false,
    },
    {
      username: 'default@user5',
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
  .then(seedDefaultUser)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
