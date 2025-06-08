import { Test, TestingModule } from '@nestjs/testing';
import { BroLockController } from './bro-lock.controller';
import { BroLockService } from './bro-lock.service';

describe('BroLockController', () => {
  let controller: BroLockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BroLockController],
      providers: [BroLockService],
    }).compile();

    controller = module.get<BroLockController>(BroLockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
