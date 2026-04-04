import { BroLockItemDto } from './bro-lock-items/bro-lock-item.dto';

export class BroLockDto {
  id: number;
  name: string;
  auther: string;
  createDate: string;
  lockCount: number;
  category: string;
  previewImg: string;
  genres: string[];
  broLockItems: BroLockItemDto[];
}
