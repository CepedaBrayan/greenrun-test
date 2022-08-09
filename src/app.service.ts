import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    try {
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
            email: 'John2Doe2@mail.com',
            username: 'JohnDoe',
            password: '123456',
            dni: '123456789',
            user_state: 'active',
          },
        });
      }
      return 'Hello World for you, test admin! ' + dbTest.username;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
