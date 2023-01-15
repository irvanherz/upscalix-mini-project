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
  search: string;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page = 1;
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit = 10;
}
