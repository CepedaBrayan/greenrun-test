import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { CreateUserClientDto } from '../dto/create-user-client.dto';
import { BadRequestException } from '@nestjs/common';

//working on with real database - and after delete
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const userClientExample: CreateUserClientDto = {
  first_name: 'John',
  last_name: 'Doe',
  phone_number: '12345678',
  email: 'JohnDoe123@example.ex',
  username: 'JohnDoe123',
  password: '12345678pass',
  dni: 'example123',
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);

    // create test user in main database
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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('clients/users', () => {
    it('should create a user client', async () => {
      const result = await controller.createClient(userClientExample);
      await prisma.user.delete({
        where: {
          dni: 'example123',
        },
      });
      expect(result).toStrictEqual({ message: 'User client created' });
    });

    it('should return an error if the user dni already exists', async () => {
      const userClientExample2: CreateUserClientDto = userClientExample;
      userClientExample2.dni = '123456789';
      try {
        await controller.createClient(userClientExample2);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should return an error if the user username already exists', async () => {
      const userClientExample2: CreateUserClientDto = userClientExample;
      userClientExample2.username = 'JohnDoe';
      try {
        await controller.createClient(userClientExample2);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should return an error if the user email already exists', async () => {
      const userClientExample2: CreateUserClientDto = userClientExample;
      userClientExample2.email = 'John2Doe2@mail.com';
      try {
        await controller.createClient(userClientExample2);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
