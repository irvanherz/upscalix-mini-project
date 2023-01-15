import { HelperModule } from '@app/helper';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailsModule } from './mails/mails.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UserConfig } from './users/entities/user-config.entity';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        port: 6379,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://postgres@localhost:5432/upscalix',
      synchronize: true,
      entities: [User, UserConfig],
      logging: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'mail.akulibur.com',
        port: 465,
        secure: true,
        auth: {
          user: 'noreply@akulibur.com',
          pass: '@Meong12345',
        },
      },
      defaults: {
        from: 'Upscalix Mini Project <mail@akulibur.com>',
      },
    }),
    UsersModule,
    NotificationsModule,
    HelperModule,
    MailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
