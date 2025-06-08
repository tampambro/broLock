import { Test, TestingModule } from '@nestjs/testing';
import { BroLockService } from './bro-lock.service';

describe('BroLockService', () => {
  let service: BroLockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BroLockService],
    }).compile();

    service = module.get<BroLockService>(BroLockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
