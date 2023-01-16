import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as moment from 'moment';
import { MailsService } from 'src/mails/mails.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Processor('birthday-notification-queue')
export class BirthdayNotificationConsumer {
  constructor(
    private readonly mailsService: MailsService,
    private readonly usersService: UsersService,
  ) {}

  @Process()
  async sendEmail(job: Job<any>) {
    const user: User = job.data.user;
    console.log(user);

    if (
      user.config.lastBirthdayGreetingAt !== null &&
      moment(user.config.lastBirthdayGreetingAt).year() === moment().year()
    )
      return true;
    await this.mailsService.send({
      subject: 'Selamat Ulang Tahun',
      message: `Hi ${user.firstName} ${user.lastName}. Selamat ulang tahun!`,
      email: `${user.email}`,
    });
    await this.usersService.updateUserLastBirthdayGreetingTime(user.id);
  }
}
