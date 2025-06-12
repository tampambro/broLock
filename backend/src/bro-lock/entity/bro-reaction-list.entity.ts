import { BRO_REACTION_ENUM } from '@bro-types/bro-reaction.enum';
import { Profile } from 'src/profile/profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BroLock } from './bro-lock.entity';

@Entity()
export class BroReactionList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, profile => profile.reactions)
  profile: Profile;

  @ManyToOne(() => BroLock, broLock => broLock.reactions)
  broLock: BroLock;

  @Column({ type: 'enum', enum: BRO_REACTION_ENUM })
  reaction: BRO_REACTION_ENUM;

  @CreateDateColumn()
  createdAt: Date;
}
