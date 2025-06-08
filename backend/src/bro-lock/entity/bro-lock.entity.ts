import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LockItem } from './lock-item.entity';
import { Profile } from 'src/profile/profile.entity';

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

  @Column({ nullable: true })
  genres: string[];

  @ManyToMany(() => Profile, profile => profile.addedBroLocks)
  addByProfiles: Profile[];
}
