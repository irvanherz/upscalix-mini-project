import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail.dto';

@Injectable()
export class MailsService {
  constructor(private readonly mailerService: MailerService) {}

  async send(sendMailDto: SendMailDto) {
    try {
      const res = await this.mailerService.sendMail({
        to: sendMailDto.email, // list of receivers
        subject: sendMailDto?.subject || '<no subject>', // Subject line
        text: sendMailDto?.message, // plaintext body
        html: '<b>welcome</b>', // HTML body content
      });
      console.log(res);
      console.log(sendMailDto);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
