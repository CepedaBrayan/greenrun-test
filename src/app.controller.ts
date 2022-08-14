import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Test application db connection' })
  @ApiTags('Setup')
  @ApiOkResponse({
    description:
      '"Hello World!" or "Hello World for you, test admin! JohnDoe" if database connection is working',
  })
  @ApiInternalServerErrorResponse()
  getHello() {
    try {
      return this.appService.getHello();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
