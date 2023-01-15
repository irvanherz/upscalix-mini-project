import { HelperService } from '@app/helper';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserConfig } from './entities/user-config.entity';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HelperService,
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: getRepositoryToken(UserConfig), useValue: {} },
        { provide: DataSource, useValue: {} },
        UsersService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
