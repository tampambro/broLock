import { BroLockCreateRequestDto } from '@dto/bro-lock/bro-lock-manage/bro-lock-create-request.dto';
import { Injectable } from '@nestjs/common';
import { BroLock } from './entity/bro-lock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LockItem } from './entity/lock-item.entity';

@Injectable()
export class BroLockService {
  constructor(
    @InjectRepository(BroLock)
    private broLockRepository: Repository<BroLock>,
    @InjectRepository(LockItem)
    private lockItemRepository: Repository<LockItem>,
  ) {}

  async createBroLock(broLockDto: BroLockCreateRequestDto): Promise<BroLock> {
    const broLock = new BroLock();

    broLock.name = broLockDto.broLockName;

    const lockItems = broLockDto.items.map(item => {
      const lock = new LockItem();
      lock.name = item.name;
      lock.position = item.position;
      lock.img = item.img ?? null;
      lock.counter = item.counter ?? null;
      // TODO: Нужно сделать белый список сайтов, чтобы не кидали ссылки на трояны.
      lock.link = item.link ?? null;
      // TODO: Коммент тоже надо проверять на ссылки и если они не из белого списка, удалять их.
      lock.comment = item.authorComment ?? null;

      return lock;
    })

    broLock.lockItems = lockItems;

    return await this.broLockRepository.save(broLock);
  }
}
