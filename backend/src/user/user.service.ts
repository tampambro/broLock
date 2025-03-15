import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@dto/create-user.dto';
import { encrypt } from './user-password.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
}
