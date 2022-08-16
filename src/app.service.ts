import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from './utils/bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class AppService {
  async getHello() {
    if (!process.env.POSTGRESQL_DATABASE_URL) return 'Hello World!';
    let dbTest = await prisma.user.findUnique({
      where: {
        username: 'JohnDoeAdmin',
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
          password: await hashPassword('12345678'),
          dni: '123456789admin',
          user_state: 'active',
        },
      });
    }
    return 'Hello World for you, test admin! ' + dbTest.username;
  }
}
