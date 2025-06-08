import { EmailConfirm } from 'src/email-confirm/email-confirm.entity';
import { Profile } from 'src/profile/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true })
  resetPasswordExpires: Date;

  @Column({ default: false })
  isMailConfirm: boolean;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToOne(() => EmailConfirm)
  @JoinColumn()
  emailConfirm: EmailConfirm;

  @OneToOne(() => Profile, profile => profile.user, { cascade: true })
  @JoinColumn()
  profile: Profile;
}
