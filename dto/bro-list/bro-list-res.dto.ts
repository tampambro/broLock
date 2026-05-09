import { BroLockPreviewItemDto } from '@dto/bro-lock/bro-lock-items/bro-lock-preview-item.dto';
import { ListMeta } from '@dto/list-meta.dto';

export class BroListResDto {
  data: BroLockPreviewItemDto[];
  meta: ListMeta;
}
