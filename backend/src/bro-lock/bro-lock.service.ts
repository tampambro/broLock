import { BroLockCreateRequestDto } from '@dto/bro-lock/bro-lock-manage/bro-lock-create-request.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BroLock } from './entity/bro-lock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LockItem } from './entity/lock-item.entity';
import { JwtPayload } from '@bro-types/jwt-payload';
import { ProfileService } from 'src/profile/profile.service';
import { BroLockDto } from '@dto/bro-lock/bro-lock.dto';

@Injectable()
export class BroLockService {
  constructor(
    @InjectRepository(BroLock)
    private broLockRepository: Repository<BroLock>,
    @InjectRepository(LockItem)
    private lockItemRepository: Repository<LockItem>,
    private profileSrv: ProfileService,
  ) { }

  async getBroLock(id: number): Promise<BroLockDto> {
    try {
      const broLock = await this.broLockRepository.findOne({
        where: { id },
        relations: ['lockItems', 'genres'],
      });

      if (broLock) {
        const { id, name, auther, createDate, category, previewImg, genres, lockItems } = broLock;

        return {
          id,
          name,
          auther,
          category,
          previewImg,
          genres,
          lockItems,
          createDate: createDate.toISOString(),
        }
      } else {
        throw 'not found';
      }
    } catch {
      throw new BadRequestException();
    }
  }

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
        lock.link = item.link ?? null;
        lock.comment = item.authorComment ?? null;

        return lock;
      })

      broLock.lockItems = lockItems;

      return await this.broLockRepository.save(broLock);
    } catch (err) {
      console.error(err);

      throw new BadRequestException();
    }
  }

  // private createPreviewLock(broLock: BroLock): BroLockPreviewItemDto {
  //   const { id, name, auther, category, previewImg, genres } = broLock;

  //   return {
  //     id,
  //     name,
  //     auther,
  //     category,
  //     previewImg,
  //     genres,
  //     createDate: broLock.createDate.toDateString(),
  //     lockCount: broLock.lockItems.length,
  //   };
  // }
}
