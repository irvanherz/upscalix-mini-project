import {
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as moment from 'moment';
import { SendMailDto } from './dto/send-mail.dto';
import { MailsService } from './mails.service';

@ApiTags('mails')
@Controller('mails')
export class MailsController {
  constructor(private readonly mailsService: MailsService) {}

  @ApiOperation({ description: 'Send email' })
  @Post('/send')
  async send(@Body() sendMailDto: SendMailDto) {
    const ok = await this.mailsService.send(sendMailDto);
    if (!ok) throw new UnprocessableEntityException();
    return {
      status: 'success',
      meta: {
        sentTime: moment().toISOString(),
      },
    };
  }
}
