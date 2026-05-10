import { BRO_LIST_STATE_ENUM } from '@dto/types/bro-state-list.enum';

export interface GetStateListParams {
  state: BRO_LIST_STATE_ENUM;
  profileId: number;
  page: number;
  size: number;
}
