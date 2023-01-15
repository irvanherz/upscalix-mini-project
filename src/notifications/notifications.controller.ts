import { Controller } from '@nestjs/common';
import { BirthdayNotificationsService } from './birthday-notifications.service';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly birthdayNotificationsService: BirthdayNotificationsService,
  ) {}
}
