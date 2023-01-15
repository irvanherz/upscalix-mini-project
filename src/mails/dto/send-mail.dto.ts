import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SendMailDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  subject?: string;
  @IsString()
  message: string;
}
