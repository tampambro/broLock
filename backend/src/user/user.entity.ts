import { EmailConfirm } from 'src/email-confirm/email-confirm.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  name: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: false })
  isMailConfirm: boolean;

  @OneToOne(() => EmailConfirm, emailConfirm => emailConfirm.user)
  emailConfirm: EmailConfirm;
}
