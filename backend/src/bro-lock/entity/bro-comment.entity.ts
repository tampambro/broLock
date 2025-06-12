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
export class BroComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, profile => profile.comments)
  profile: Profile;

  @ManyToOne(() => BroLock, broLock => broLock.comments)
  broLock: BroLock;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;
}
