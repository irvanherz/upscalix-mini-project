import { HelperService } from '@app/helper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindManyUserQuery } from './dto/find-many-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserConfig } from './entities/user-config.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserConfig)
    private usersConfigRepository: Repository<UserConfig>,
    private helperService: HelperService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    const config = this.usersConfigRepository.create();
    config.user = user;
    await this.dataSource.transaction(async (manager) => {
      await manager.save(user);
      await manager.save(config);
    });

    return user;
  }

  async findMany(filters: FindManyUserQuery) {
    const { page, limit, ...f } = filters;
    const skip = (page - 1) * limit;
    const take = limit;
    const where = this.helperService.mapQueryFilters(f, {
      search: (v) => ({ firstName: Like(v) }),
    });
    const result = await this.usersRepository.findAndCount({
      where,
      skip,
      take,
    });
    return result;
  }

  async findById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user;
  }

  async updateById(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.usersRepository.update(id, updateUserDto);
    return result.affected;
  }

  async deleteById(id: number) {
    const result = await this.usersRepository.delete(id);
    return result.affected;
  }
}
