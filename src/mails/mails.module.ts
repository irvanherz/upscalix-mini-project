import { Module } from '@nestjs/common';
import { MailsController } from './mails.controller';
import { MailsService } from './mails.service';

@Module({
  controllers: [MailsController],
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}
