import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserClientDto } from './dto/create-user-client.dto';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async createClient(createUserClientDto: CreateUserClientDto) {
    // verif dni
    const dniVerif = await prisma.user.findUnique({
      where: {
        dni: createUserClientDto.dni,
      },
    });
    if (dniVerif) {
      throw new BadRequestException({
        message: 'An user with this dni already exists',
      });
    }

    // verif username
    const usernameVerif = await prisma.user.findUnique({
      where: {
        username: createUserClientDto.username,
      },
    });
    if (usernameVerif) {
      throw new BadRequestException({
        message: 'An user with this username already exists, try another one',
      });
    }

    // verif email
    const emailVerif = await prisma.user.findUnique({
      where: {
        email: createUserClientDto.email,
      },
    });
    if (emailVerif) {
      throw new BadRequestException({
        message: 'An user with this email already exists, try another one',
      });
    }

    // hash password
    createUserClientDto.password = await hashPassword(
      createUserClientDto.password,
    );

    // create user client
    await prisma.user.create({
      data: {
        ...createUserClientDto,
        role: 'client',
      },
    });

    return { message: 'User client created' };
  }

  async createAdmin(createUserAdminDto: CreateUserAdminDto) {
    // verif auth code for create an admin
    const authCodeVerif = await prisma.auth.findUnique({
      where: {
        auth_name: 'create-admin',
      },
    });
    if (!authCodeVerif || authCodeVerif.code !== createUserAdminDto.auth_code) {
      throw new UnauthorizedException({
        message: 'The auth code to create an admin is not valid',
      });
    }

    // verif dni
    const dniVerif = await prisma.user.findUnique({
      where: {
        dni: createUserAdminDto.dni,
      },
    });
    if (dniVerif) {
      throw new BadRequestException({
        message: 'An user with this dni already exists',
      });
    }

    // verif username
    const usernameVerif = await prisma.user.findUnique({
      where: {
        username: createUserAdminDto.username,
      },
    });
    if (usernameVerif) {
      throw new BadRequestException({
        message: 'An user with this username already exists, try another one',
      });
    }

    // verif email
    const emailVerif = await prisma.user.findUnique({
      where: {
        email: createUserAdminDto.email,
      },
    });
    if (emailVerif) {
      throw new BadRequestException({
        message: 'An user with this email already exists, try another one',
      });
    }

    // hash password
    createUserAdminDto.password = await hashPassword(
      createUserAdminDto.password,
    );

    // create user client
    await prisma.user.create({
      data: {
        first_name: createUserAdminDto.first_name,
        last_name: createUserAdminDto.last_name,
        phone_number: createUserAdminDto.phone_number,
        email: createUserAdminDto.email,
        username: createUserAdminDto.username,
        password: createUserAdminDto.password,
        dni: createUserAdminDto.dni,
        role: 'admin',
      },
    });

    return { message: 'User admin created' };
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
