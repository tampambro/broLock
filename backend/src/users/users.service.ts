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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUser(userId: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id: userId });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = await encrypt(createUserDto.password);

    return this.userRepository.save(user);
  }

  async sendEmailConfirm(userId: number) {
    const user = await this.findUser(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isMailConfirm) {
      throw new UnprocessableEntityException('Email already confirm');
    }

    // const otp
  }
}
