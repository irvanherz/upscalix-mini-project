import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Queue } from 'bull';
import { UsersService } from '../users/users.service';

@Injectable()
export class BirthdayNotificationsService {
  constructor(
    // @InjectRepository(User)
    // private usersRepository: Repository<User>,
    private usersService: UsersService,
    @InjectQueue('birthday-notification-queue')
    private birthdayNotificationQueue: Queue,
  ) {}

  /**
   * Bithday notifications scheduler. Runs each 15 minutes. Considered based on
   * granularity of common timezone offsets
   */
  // @Cron('* */15 * * * *', {
  @Cron('*/50 * * * * *', {
    name: 'birthday-notification-task',
  })
  async triggerNotifications() {
    // using generator functions makes loop of million users possible
    // const usersRepo = this.usersRepository;
    async function* usersOnBirthdayGenerator() {
      let page = 1;
      while (true) {
        // const take = 100;
        // const skip = (page - 1) * take;
        //() DATE_OF_BIRTH AT USERTZ == DATE(NOW()) AT USERTZ)   &&   (HOUR AT USERTZ == 9 || LASTSEND
        const users = [];
        // await usersRepo.find({
        //   // where: {
        //   //   dob: Raw(
        //   //     (alias) => `(${alias}::timestamp AT TIME ZONE 'UTC') > NOW()`,
        //   //   ),
        //   // },
        //   skip,
        //   take,
        // });
        if (!users.length) break;
        yield* [...users];
        page = page + 1;
      }
      return;
    }

    const users = await usersOnBirthdayGenerator();
    for await (const user of users) {
      console.log('U', user.email);

      // this.birthdayNotificationQueue.add({ user }, { delay: 10000 });
    }
  }
}
