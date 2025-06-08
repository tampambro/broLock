import { Module } from '@nestjs/common';
import { BroLockService } from './bro-lock.service';
import { BroLockController } from './bro-lock.controller';

@Module({
  controllers: [BroLockController],
  providers: [BroLockService],
})
export class BroLockModule {}
