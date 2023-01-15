import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  // let usersService: UsersService;
  // let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    // usersService = module.get<UsersService>(UsersService);
    // usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  // describe('findMany', () => {
  //   it('should return array of users', async () => {
  //     const result = 'OK';
  //     jest.spyOn(usersService, 'findAll').mockImplementation(() => result);

  //     expect(await usersController.findAll()).toBe(result);
  //   });
  // });
});
