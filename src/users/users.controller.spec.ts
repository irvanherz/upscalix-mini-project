import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const moduleMocker = new ModuleMocker(global);

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    })
      .useMocker((token) => {
        if (token === UsersService) {
          return {
            findMany: jest.fn().mockResolvedValue([[], 0]),
            findById: jest.fn().mockImplementation((id) => {
              if (id === 1) return {};
              else return null;
            }),
            updateById: jest.fn().mockImplementation((id) => {
              return id;
            }),
            deleteById: jest.fn().mockImplementation((id) => {
              return id;
            }),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();
    controller = module.get(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findMany', () => {
    it('should return correct data structure', async () => {
      expect(await controller.findMany({})).toHaveProperty('status', 'success');
      expect(await controller.findMany({})).toHaveProperty('data');
    });
  });
  describe('findById', () => {
    it('should return correct data structure', async () => {
      expect(await controller.findById(1)).toHaveProperty('status', 'success');
      expect(await controller.findById(1)).toHaveProperty('data');
    });
    it('should throw error on not found', async () => {
      await expect(controller.findById(2)).rejects.toThrow(NotFoundException);
    });
  });
  describe('updateById', () => {
    it('should return without error', async () => {
      expect(await controller.updateById(1, {} as any)).toBe(undefined);
    });
    it('should throw error on not found', async () => {
      await expect(controller.updateById(2, {} as any)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  describe('deleteById', () => {
    it('should return without error', async () => {
      expect(await controller.deleteById(1)).toBe(undefined);
    });
    it('should throw error on not found', async () => {
      await expect(controller.deleteById(2)).rejects.toThrow(NotFoundException);
    });
  });
});
