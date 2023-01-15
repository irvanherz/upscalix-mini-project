import { HttpService } from '@nestjs/axios';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Processor('birthday-notification-queue')
export class BirthdayNotificationConsumer {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
  ) {}

  @Process()
  async sendEmail(job: Job<User>) {
    console.log('JOB', job.data);

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
