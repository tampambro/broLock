import { BRO_LIST_STATE_ENUM } from '../types/bro-state-list.enum';

export class BroListReqDto {
  profileId: number;
  size?: number;
  page?: number;
  state?: BRO_LIST_STATE_ENUM;
}
