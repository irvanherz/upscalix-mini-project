import { HelperService } from '@app/helper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import {
  FindBirthdayGreetingReceiverQuery,
  FindManyUserQuery,
} from './dto/find-many-user.dto';
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
    const { page = 1, limit = 10, ...f } = filters;
    const skip = (page - 1) * limit;
    const take = limit;
    const where = this.helperService.mapQueryFilters(f, {
      search: (v) => ({ firstName: ILike(v) }),
    });
    const result = await this.usersRepository.findAndCount({
      where,
      skip,
      take,
    });
    return result;
  }

  async findBirthdayGreetingReceiver(
    filters: FindBirthdayGreetingReceiverQuery,
  ) {
    const { page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;
    const take = limit;

    // Find users by these condition:
    // - CURRENT_HOUR (user timezone) is 9
    // - MONTH_OF_DOB == MONTH_OF_NOW (user timezone)
    // - DAY_OF_DOB == DAY_OF_NOW (user timezone)
    // - LAST_GREETING_SENT IS NULL || YEAR(LAST_GREETING_SENT) == YEAR(NOW) - 1
    const result = await this.usersRepository
      .createQueryBuilder('u')
      .leftJoin('u.config', 'c')
      .where(
        `(
        EXTRACT(hour FROM (NOW() AT TIME ZONE u.location)) = 9 
        AND
        EXTRACT(month FROM CAST(u.dob as timestamp)) = EXTRACT(month FROM (NOW() AT TIME ZONE u.location))
        AND
        EXTRACT(day FROM CAST(u.dob as timestamp)) = EXTRACT(day FROM (NOW() AT TIME ZONE u.location))
        AND (
          c."lastBirthdayGreetingAt" IS NULL
          OR
          EXTRACT(year FROM c."lastBirthdayGreetingAt" AT TIME ZONE u.location) = (EXTRACT(year FROM NOW() AT TIME ZONE u.location) - 1)
        )
      )`,
      )
      .skip(skip)
      .take(take)
      .getMany();
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
