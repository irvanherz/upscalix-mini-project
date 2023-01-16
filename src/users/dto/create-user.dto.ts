import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsDateString({ strict: false })
  @ApiProperty({
    description: "Location as timezone. For example 'Asia/Jakarta'",
  })
  dob: Date;
  @IsString()
  location: string;
}
