import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserClientDto } from './dto/create-user-client.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('clients')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/users')
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
