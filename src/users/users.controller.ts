import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserClientDto } from './dto/create-user-client.dto';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { AuthUserDto } from './dto/auth-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/clients')
  @ApiOperation({ summary: 'Create user client' })
  @ApiTags('Users')
  @ApiCreatedResponse({
    description: 'User client created',
  })
  @ApiBadRequestResponse({
    description:
      'An user with this {dni, username, email} already exists, try another one',
  })
  @ApiInternalServerErrorResponse()
  createClient(@Body() createUserClientDto: CreateUserClientDto) {
    try {
      return this.usersService.createClient(createUserClientDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('/admins')
  @ApiOperation({ summary: 'Create user admin' })
  @ApiTags('Users')
  @ApiCreatedResponse({
    description: 'User admin created',
  })
  @ApiUnauthorizedResponse({
    description: 'The auth code to create an admin is not valid',
  })
  @ApiBadRequestResponse({
    description:
      'An user with this {dni, username, email} already exists, try another one',
  })
  @ApiInternalServerErrorResponse()
  createAdmin(@Body() createUserAdminDto: CreateUserAdminDto) {
    try {
      return this.usersService.createAdmin(createUserAdminDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login for clients and admins' })
  @ApiTags('Users')
  @ApiCreatedResponse({
    description: '"access_token" : "JWT"',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @ApiInternalServerErrorResponse()
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return this.authService.login(
        await this.usersService.findOne(loginUserDto.username),
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiTags('Users')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Object with user data' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse()
  async getProfile(@Req() req) {
    try {
      return this.authService.findUser(req.user.username);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
