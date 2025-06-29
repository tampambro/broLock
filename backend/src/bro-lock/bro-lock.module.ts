import { Module } from '@nestjs/common';
import { BroLockService } from './bro-lock.service';
import { BroLockController } from './bro-lock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BroLock } from './entity/bro-lock.entity';
import { LockItem } from './entity/lock-item.entity';
import { Genre } from './entity/genre.entity';
import { BroStateList } from './entity/bro-state-list.entity';
import { BroReactionList } from './entity/bro-reaction-list.entity';
import { BroComment } from './entity/bro-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BroLock,
      LockItem,
      Genre,
      BroStateList,
      BroReactionList,
      BroComment,
    ]),
  ],
  controllers: [BroLockController],
  providers: [BroLockService],
})
export class BroLockModule {}
