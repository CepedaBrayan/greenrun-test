import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { CreateUserClientDto } from '../dto/create-user-client.dto';
import { CreateUserAdminDto } from '../dto/create-user-admin.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { hashPassword } from '../../utils/bcrypt';
import { AuthModule } from '../../auth/auth.module';
import { forwardRef } from '@nestjs/common';

//working on with real database - and after delete
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const userClientExample: CreateUserClientDto = {
  first_name: 'John',
  last_name: 'Doe',
  phone_number: '12345678',
  email: 'JohnDoe123@example.ex',
  username: 'JohnDoe123',
  password: '',
  dni: 'example123',
};
const userAdminExample: CreateUserAdminDto = {
  auth_code: String(process.env.AUTH_CODE_CREATE_ADMIN),
  first_name: 'JohnAdmin2',
  last_name: 'DoeAdmin2',
  phone_number: '12345678',
  email: 'JohnDoeAdmin2@example.ex',
  username: 'JohnDoeAdmin2',
  password: '',
  dni: 'example123Admin2',
};

// hashingExamples
async () => {
  userClientExample.password = await hashPassword('12345678pass');
  userAdminExample.password = await hashPassword('12345678pass');
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AuthModule)],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);

    // create test users in main database
    // client
    let dbTestClient = await prisma.user.findUnique({
      where: {
        username: 'JohnDoe',
      },
    });
    if (!dbTestClient) {
      dbTestClient = await prisma.user.create({
        data: {
          role: 'client',
          first_name: 'John',
          last_name: 'Doe',
          email: 'John2Doe2@mail.com',
          username: 'JohnDoe',
          password: await hashPassword('12345678'),
          dni: '123456789',
          user_state: 'active',
        },
      });
    }

    // admin
    let dbTestAdmin = await prisma.user.findUnique({
      where: {
        username: 'JohnDoeAdmin',
      },
    });
    if (!dbTestAdmin) {
      dbTestAdmin = await prisma.user.create({
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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('users/clients', () => {
    it('should create an user client', async () => {
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

  describe('users/admins', () => {
    it('should create an user admin', async () => {
      const result = await controller.createAdmin(userAdminExample);
      await prisma.user.delete({
        where: {
          dni: 'example123Admin2',
        },
      });
      expect(result).toStrictEqual({ message: 'User admin created' });
    });

    it('should return an unauthorized error if the auth code is wrong', async () => {
      const userAdminExample2: CreateUserAdminDto = userAdminExample;
      userAdminExample2.auth_code = 'wrongs';
      try {
        await controller.createAdmin(userAdminExample2);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should return an error if the user dni already exists', async () => {
      const userAdminExample2: CreateUserAdminDto = userAdminExample;
      userAdminExample2.dni = '123456789admin';
      try {
        await controller.createClient(userAdminExample2);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should return an error if the user username already exists', async () => {
      const userAdminExample2: CreateUserAdminDto = userAdminExample;
      userAdminExample2.username = 'JohnDoeAdmin';
      try {
        await controller.createClient(userAdminExample2);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should return an error if the user email already exists', async () => {
      const userAdminExample2: CreateUserAdminDto = userAdminExample;
      userAdminExample2.email = 'John2DoeAdmin@mail.com';
      try {
        await controller.createClient(userAdminExample2);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('users/login', () => {
    it('should login an user client', async () => {
      const loginUserDto: LoginUserDto = {
        username: userClientExample.username,
        password: userClientExample.password,
      };
      const result = await controller.login(loginUserDto);
      expect(result.access_token).toBeDefined();
    });
    it('should unauthorized login an user client', async () => {
      const loginUserDto: LoginUserDto = {
        username: userClientExample.username,
        password: 'wrongPassword',
      };
      try {
        await controller.login(loginUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
    it('should login an user admin', async () => {
      const loginUserDto: LoginUserDto = {
        username: userAdminExample.username,
        password: userAdminExample.password,
      };
      const result = await controller.login(loginUserDto);
      expect(result.access_token).toBeDefined();
    });
    it('should unauthorized login an user admin', async () => {
      const loginUserDto: LoginUserDto = {
        username: userAdminExample.username,
        password: 'wrongPassword',
      };
      try {
        await controller.login(loginUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });

  describe('users/profile', () => {
    it('should return a profile for an user client', async () => {
      const loginUserDto: LoginUserDto = {
        username: userClientExample.username,
        password: userClientExample.password,
      };
      const result = await controller.login(loginUserDto);
      const headersRequest = {
        Authorization: `Bearer ${result.access_token}`,
      };
      const profile = await controller.getProfile({ headers: headersRequest });
      expect(profile).toBeDefined();
    });
    it('should unauthorized profile for an user client', async () => {
      const loginUserDto: LoginUserDto = {
        username: userClientExample.username,
        password: userClientExample.password,
      };
      const result = await controller.login(loginUserDto);
      try {
        await controller.getProfile({
          Headers: { Bearer: result.access_token },
        });
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
    it('should return a profile for an user admin', async () => {
      const loginUserDto: LoginUserDto = {
        username: userAdminExample.username,
        password: userAdminExample.password,
      };
      const result = await controller.login(loginUserDto);
      const profile = await controller.getProfile({
        Headers: { Bearer: result.access_token },
      });
      expect(profile).toBeDefined();
    });
    it('should unauthorized profile for an user admin', async () => {
      const loginUserDto: LoginUserDto = {
        username: userAdminExample.username,
        password: userAdminExample.password,
      };
      const result = await controller.login(loginUserDto);
      try {
        await controller.getProfile({
          Headers: { Bearer: result.access_token },
        });
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
