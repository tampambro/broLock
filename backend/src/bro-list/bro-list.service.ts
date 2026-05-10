import { GetListParams } from '@bro-types/get-list-params';
import { Injectable } from '@nestjs/common';
import { BroListResDto } from '@dto/bro-list/bro-list-res.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BroLock } from 'src/bro-lock/entity/bro-lock.entity';
import { Repository } from 'typeorm';
import { BroStateList } from 'src/bro-lock/entity/bro-state-list.entity';
import { GetStateListParams } from '@bro-types/get-state-list-params';

@Injectable()
export class BroListService {
  constructor(
    @InjectRepository(BroLock) private broLockRepo: Repository<BroLock>,
    @InjectRepository(BroStateList) private broStateListRepo: Repository<BroStateList>,
  ) { }

  async getCreatedList(params: GetListParams): Promise<BroListResDto> {
    const { profileId, page, size } = params;
    const offset = (page - 1) * size;

    const [list, total] = await this.broLockRepo.findAndCount({
      where: { creator: { id: profileId } },
      relations: ['broStateList', 'lockItems'],
      skip: offset,
      take: size,
    });

    return this.createListResponse(list, total);
  }

  async getAddedList(params: GetListParams): Promise<BroListResDto> {
    const { profileId, page, size } = params;
    const offset = (page - 1) * size;

    const [list, total] = await this.broLockRepo.findAndCount({
      where: { addByProfiles: { id: profileId } },
      relations: ['addByProfiles', 'lockItems'],
      skip: offset,
      take: size,
    });

    return this.createListResponse(list, total);
  }

  async getListsByState(params: GetStateListParams): Promise<BroListResDto> {
    const { state, profileId, page, size } = params;
    const offset = (page - 1) * size;

    const [lists, total] = await this.broLockRepo
      .createQueryBuilder('broLock')
      .innerJoinAndSelect(
        'broLock.broStateList',
        'broStateList',
        'broStateList.profile = :profileId AND broStateList.state = :state',
        { profileId, state },
      )
      .leftJoinAndSelect('broLock.creator', 'creator')
      .addSelect(
        qb => qb
          .select('COUNT(li.id)')
          .from('lock_item', 'li')
          .where('li.broLockId = broLock.id'),
        'lockCount',
      )
      .skip(offset)
      .take(size)
      .getManyAndCount();

      return this.createListResponse(lists, total);
  }

  private createListResponse(list: BroLock[], total: number): BroListResDto {

    const listDtos = list.map(({
      id,
      name,
      auther,
      category,
      previewImg,
      genres,
      createDate,
      lockItems
    }) => ({
      id,
      name,
      auther,
      category,
      previewImg,
      genres,
      createDate: createDate.toDateString(),
      lockCount: lockItems.length,
    }))

    return {
      data: listDtos,
      meta: { counter: total}
    }
  }
}
