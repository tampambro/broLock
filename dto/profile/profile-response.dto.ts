import { BroLockPreviewItemDto } from '../bro-lock-items/bro-lock-preview-item.dto';

export class ProfileResponseDto {
  userName: string;
  avatar: string;
  userPhrase: string;
  createdBroLocks: BroLockPreviewItemDto[];
  addedBroLocks: BroLockPreviewItemDto[];
  activeLocks: BroLockPreviewItemDto[];
  closeLocks: BroLockPreviewItemDto[];
  lateLocks: BroLockPreviewItemDto[];
  trashLocks: BroLockPreviewItemDto[];
  likeLocks: BroLockPreviewItemDto[];
  dislikeLocks: BroLockPreviewItemDto[];
  pokerFaceLocks: BroLockPreviewItemDto[];
}
