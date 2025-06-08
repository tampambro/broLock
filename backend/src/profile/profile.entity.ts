import { BroLock } from '../bro-lock/entity/bro-lock.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @OneToOne(() => User, user => user.profile)
  user: User;

  @OneToMany(() => BroLock, broLock => broLock.creator)
  createdBroLocks: BroLock[];

  @ManyToMany(() => BroLock, broLock => broLock.addByProfiles)
  @JoinTable({
    name: 'profiles_added_bro_locks',
    joinColumn: { name: 'profileId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'broLockId', referencedColumnName: 'id' },
  })
  addedBroLocks: BroLock[];

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, length: 255 })
  userPhrase: string;
}
