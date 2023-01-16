import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Queue } from 'bull';
import { UsersService } from '../users/users.service';

@Injectable()
export class BirthdayNotificationsService {
  constructor(
    private usersService: UsersService,
    @InjectQueue('birthday-notification-queue')
    private birthdayNotificationQueue: Queue,
  ) {}

  /**
   * Bithday notifications scheduler. Runs each 15 minutes. Considered based on
   * granularity of common timezone offsets
   */
  @Cron('* */15 * * * *', {
    // @Cron('*/10 * * * * *', {
    name: 'birthday-notification-task',
  })
  async triggerNotifications() {
    // using generator functions makes loop of million users possible
    const usersService = this.usersService;
    async function* usersOnBirthdayGenerator() {
      let page = 1;
      while (true) {
        const users = await usersService.findBirthdayGreetingReceiver({
          page,
          limit: 100,
        });
        if (!users.length) break;
        yield* [...users];
        page = page + 1;
      }
      return;
    }

    const users = await usersOnBirthdayGenerator();
    for await (const user of users) {
      this.birthdayNotificationQueue.add(
        { user },
        { timeout: 20000, attempts: 5 },
      );
    }
  }
}
