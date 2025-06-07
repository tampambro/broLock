import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@dto/auth/create-user.dto';
import { encrypt } from './user-password.helper';
import { EmailConfirm } from 'src/email-confirm/email-confirm.entity';
import { UserInfoRequestDto } from '@dto/user/user-info-request.dto';
import { UserInfoResponseDto } from '@dto/user/user-info-response.dto';
import { SetBroPhraseRequest } from '@dto/user/set-bro-phrase-request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(user: number | string): Promise<User | null> {
    const findParam = typeof user === 'number' ? { id: user } : { name: user };

    return await this.userRepository.findOneBy(findParam);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneByEmailConfirm(
    emailConfirm: EmailConfirm,
  ): Promise<User | null> {
    return await this.userRepository.findOneBy({
      emailConfirm: { id: emailConfirm.id },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = await encrypt(createUserDto.password);

    return this.userRepository.save(user);
  }

  async save(user: User): Promise<void> {
    this.userRepository.save(user);
  }

  async saveRefreshToken(user: User, token: string | null): Promise<void> {
    user.refreshToken = token;
    await this.save(user);
  }

  async invalidateRefreshToken(userId: number): Promise<void> {
    const user = await this.findOne(userId);
    if (user) {
      user.refreshToken = null;
      await this.userRepository.save(user);
    }
  }

  async getUserInfo(params: UserInfoRequestDto): Promise<UserInfoResponseDto> {
    const user = await this.findOne(params.userId);

    if (!user) {
      throw new BadRequestException();
    }

    return {
      userName: user.name,
      avatar: user.avatar,
      userPhrase: user.userPhrase,
    };
  }

  async setBroPhrase(broPhrase: SetBroPhraseRequest): Promise<void> {
    const user = await this.findOne(broPhrase.userId);

    if (!user) {
      throw new BadRequestException();
    }

    user.userPhrase = broPhrase.phrase;
    await this.save(user);
  }
}
