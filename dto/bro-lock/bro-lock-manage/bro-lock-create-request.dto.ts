import { BroLockItemDto } from '../bro-lock-items/bro-lock-item.dto';

export class BroLockCreateRequestDto {
  broLockName: string;
  items: BroLockItemDto[];
}
