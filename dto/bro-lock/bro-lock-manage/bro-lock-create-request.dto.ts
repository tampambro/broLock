import { BroLockItemDto } from '../bro-lock-items/bro-list-item.dto';

export class BroLockCreateRequestDto {
  broLockName: string;
  items: BroLockItemDto[];
}
