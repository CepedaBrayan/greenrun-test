import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AppService {
  async getHello() {
    if (!process.env.POSTGRESQL_DATABASE_URL) return 'Hello World!';
    let dbTest = await prisma.user.findUnique({
      where: {
        username: 'JohnDoe',
      },
    });
    if (!dbTest) {
      dbTest = await prisma.user.create({
        data: {
          role: 'admin',
          first_name: 'John',
          last_name: 'Doe',
          email: 'John2DoeAdmin@mail.com',
          username: 'JohnDoeAdmin',
          password: '123456',
          dni: '123456789admin',
          user_state: 'active',
        },
      });
    }
    return 'Hello World for you, test admin! ' + dbTest.username;
  }
}
