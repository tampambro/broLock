import { BroLockCreateRequestDto } from '@dto/bro-lock/bro-lock-manage/bro-lock-create-request.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BroLock } from './entity/bro-lock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LockItem } from './entity/lock-item.entity';
import { JwtPayload } from '@bro-types/jwt-payload';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class BroLockService {
  constructor(
    @InjectRepository(BroLock)
    private broLockRepository: Repository<BroLock>,
    @InjectRepository(LockItem)
    private lockItemRepository: Repository<LockItem>,
    private profileSrv: ProfileService,
  ) {}

  async createBroLock(
    broLockDto: BroLockCreateRequestDto,
    currentUser: JwtPayload,
  ): Promise<BroLock> {
    const profile = await this.profileSrv.findByUser(currentUser.userId);
    const broLock = new BroLock();

    try {
      broLock.name = broLockDto.broLockName;
      broLock.auther = profile.userName;
      broLock.creator = profile;
      broLock.category = 'test-category';

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
    } catch (err) {
      console.error(err.message);

      throw new BadRequestException();
    }
  }
}
