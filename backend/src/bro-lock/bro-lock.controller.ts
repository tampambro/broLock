import { Controller } from '@nestjs/common';
import { BroLockService } from './bro-lock.service';

@Controller('bro-lock')
export class BroLockController {
  constructor(private readonly broLockService: BroLockService) {}
}
