import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNumberString, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserParam {
  @IsNumberString()
  id: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsDate()
  dob: Date;
}
