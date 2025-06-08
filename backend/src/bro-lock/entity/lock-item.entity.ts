import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BroLock } from './bro-lock.entity';

@Entity()
export class LockItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: number;

  @Column()
  check: boolean;

  @ManyToOne(() => BroLock, broLock => broLock.lockItems)
  broLock: BroLock;

  @Column({ nullable: true, length: 510 })
  comment: string;

  @Column({ nullable: true, length: 255 })
  link: string;
}
