import { Module } from '@nestjs/common';
import { BroListService } from './bro-list.service';
import { BroListController } from './bro-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BroLock } from 'src/bro-lock/entity/bro-lock.entity';
import { BroStateList } from 'src/bro-lock/entity/bro-state-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BroLock, BroStateList])],
  controllers: [BroListController],
  providers: [BroListService],
  exports: [BroListService],
})
export class BroListModule {}
