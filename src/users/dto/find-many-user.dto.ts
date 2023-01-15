import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class FindManyUserQuery {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Search by firstName. Optional.',
    required: false,
  })
  search?: string;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @ApiProperty({
    description: 'Page number. Minimum 1.',
    default: 1,
    required: false,
  })
  page?: number = 1;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @ApiProperty({
    description: 'Limit per page. Minimum 1. Default 10',
    default: 10,
    required: false,
  })
  limit?: number = 10;
}

export class FindBirthdayGreetingReceiverQuery {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit?: number = 10;
}
