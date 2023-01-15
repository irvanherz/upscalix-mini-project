import { HelperModule } from '@app/helper';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
    }),
    UsersModule,
    NotificationsModule,
    HelperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
