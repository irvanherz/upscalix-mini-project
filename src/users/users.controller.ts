import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FindManyUserQuery } from './dto/find-many-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findMany(@Query() query: FindManyUserQuery) {
    const [users, count] = await this.usersService.findMany(query);
    return {
      status: 'success',
      data: users,
      meta: count,
    };
  }

  @Get(':id')
  async findyId(@Param('id') id: number) {
    const user = await this.usersService.findById(id);
    if (!user)
      throw new NotFoundException({
        status: 'error',
        error: 'not-found',
        message: 'The specified user was not found',
      });

    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findById(id);
    if (!user)
      throw new NotFoundException({
        status: 'error',
        error: 'not-found',
        message: 'The specified user was not found',
      });
    await this.usersService.updateById(id, updateUserDto);
    return;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const user = await this.usersService.findById(id);
    if (!user)
      throw new NotFoundException({
        status: 'error',
        error: 'not-found',
        message: 'The specified user was not found',
      });
    return this.usersService.deleteById(id);
  }
}
