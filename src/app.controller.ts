import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('setup')
  @ApiResponse({
    status: 200,
    description:
      '"Hello World!" or "Hello World for you, test admin! JohnDoe" if database connection is working',
  })
  getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
