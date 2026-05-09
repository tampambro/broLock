import { GetListParams } from '@bro-types/get-list-params';
import { Injectable } from '@nestjs/common';
import { BroListResDto } from '@dto/bro-list/bro-list-res.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BroLock } from 'src/bro-lock/entity/bro-lock.entity';
import { Repository } from 'typeorm';
import { BroStateList } from 'src/bro-lock/entity/bro-state-list.entity';

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

    const listDtos = list.map(({id, name, auther, createDate, category, previewImg, genres, lockItems}) => ({
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
