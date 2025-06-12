import { Profile } from 'src/profile/profile.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BroLock } from './bro-lock.entity';
import { BRO_LIST_STATE_ENUM } from '@bro-types/bro-state-list.enum';

@Entity()
export class BroStateList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, profile => profile.broStatusList)
  profile: Profile;

  @ManyToOne(() => BroLock, broLock => broLock.broStatusList)
  broLock: BroLock;

  @Column({ type: 'enum', enum: BRO_LIST_STATE_ENUM })
  state: BRO_LIST_STATE_ENUM;
}
