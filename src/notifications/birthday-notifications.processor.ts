import { HttpService } from '@nestjs/axios';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Processor('birthday-notification-queue')
export class BirthdayNotificationConsumer {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
  ) {}

  @Process()
  async sendEmail(job: Job<User>) {
    const user = job.data;

    this.httpService.post(
      'https://email-service.digitalenvision.com.au/send-email',
      {
        email: user.email,
        message: `Hey, ${user.firstName} ${user.lastName}. It’s your birthday!`,
      },
    );
  }
}
