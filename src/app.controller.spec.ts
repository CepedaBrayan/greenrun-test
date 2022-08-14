import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('setup', () => {
    it('should return "Hello World!"', async () => {
      expect(await appController.getHello()).toContain('Hello World');
    });
  });

  describe('database connection', () => {
    it('should return "Hello World for you, test admin! JohnDoe"', async () => {
      expect(await appController.getHello()).toBe(
        'Hello World for you, test admin! JohnDoe',
      );
    });
  });
});
