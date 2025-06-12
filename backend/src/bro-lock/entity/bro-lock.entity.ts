import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LockItem } from './lock-item.entity';
import { Profile } from 'src/profile/profile.entity';
import { Genre } from './genre.entity';
import { BroStateList } from './bro-state-list.enity';
import { BroComment } from './bro-comment.entity';
import { BroReactionList } from './bro-reaction-list.entity';

@Entity()
export class BroLock {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createDate: Date;

  @Column({ length: 255 })
  name: string;

  @ManyToOne(() => Profile, profile => profile.createdBroLocks)
  creator: Profile;

  @Column()
  category: string;

  @OneToMany(() => LockItem, lockItem => lockItem.broLock, { cascade: true })
  lockItems: LockItem[];

  @Column({ nullable: true })
  lockImg: string;

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: string[];

  @ManyToMany(() => Profile, profile => profile.addedBroLocks)
  addByProfiles: Profile[];

  @OneToMany(() => BroStateList, broStateList => broStateList.broLock)
  broStatusList: BroStateList[];

  @OneToMany(() => BroReactionList, broReactionList => broReactionList.broLock)
  reactions: BroLock[];

  @OneToMany(() => BroComment, broComment => broComment.broLock)
  comments: BroLock[];

  @Column({ nullable: true, length: 255 })
  img: string;
}
