import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@dto/create-user.dto';
import { encrypt } from './user-password.helper';
import { EmailConfirmService } from 'src/email-confirm/email-confirm.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private emailConfirmSrv: EmailConfirmService,
    private emailSrv: EmailService,
  ) {}

  async findOne(user: number | string): Promise<User | null> {
    const findParam = typeof user === 'number' ? { id: user } : { name: user };
    return this.userRepository.findOneBy(findParam);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = await encrypt(createUserDto.password);

    return this.userRepository.save(user);
  }

  async sendEmailConfirm(userName: string) {
    const user = await this.findOne(userName);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isMailConfirm) {
      throw new UnprocessableEntityException('Email already confirm');
    }

    const otp = await this.emailConfirmSrv.createEmailConfirmOtp(user.id);

    this.emailSrv.sendEmail({
      subject: 'BroLock — account confirm',
      recipients: [{ name: user.name, address: user.email }],
      html: this.emailSrv.confirmEmailTemplate(user.name, otp),
    });
  }
}
