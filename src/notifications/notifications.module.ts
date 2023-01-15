import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { BirthdayNotificationConsumer } from './birthday-notifications.processor';
import { BirthdayNotificationsService } from './birthday-notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: 'birthday-notification-queue',
    }),
    UsersModule,
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    BirthdayNotificationsService,
    BirthdayNotificationConsumer,
  ],
})
export class NotificationsModule {}
