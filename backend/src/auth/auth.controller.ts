import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from '@dto/create-user.dto';
import { CommonAddResponseDto } from '@dto/common-add-response.dto';
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
  async singup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CommonAddResponseDto> {
    const newUser = await this.usersService.create(createUserDto);
    return { id: newUser.id };
  }
}
