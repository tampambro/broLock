import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from '@dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Get()
  test() {
    return 'test';
  }

  @HttpCode(201)
  @Post('singup')
  singup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
