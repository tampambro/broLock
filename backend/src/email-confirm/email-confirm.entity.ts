import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EmailConfirm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  linkHash: string;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ length: 255, unique: true })
  email: string;
}
