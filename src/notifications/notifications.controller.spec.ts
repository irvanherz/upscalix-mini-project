import { Test, TestingModule } from '@nestjs/testing';
import { BirthdayNotificationsService } from './birthday-notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

describe('NotificationsController', () => {
  let controller: NotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        { provide: NotificationsService, useValue: {} },
        { provide: BirthdayNotificationsService, useValue: {} },
      ],
    }).compile();

    controller = module.get(NotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
