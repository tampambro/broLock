import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '@dto/create-user.dto';
import { LoginRequestDto } from '@dto/login-request.dto';
import { CommonAddResponseDto } from '@dto/common-add-response.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authSrv: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('guard-test')
  test() {
    return 'Guard at the post';
  }

  @HttpCode(201)
  @Post('singup')
  async singup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CommonAddResponseDto> {
    const newUser = await this.userService.create(createUserDto);
    return { id: newUser.id };
  }

  @HttpCode(200)
  @Post('login')
  singIn(@Body() login: LoginRequestDto) {
    return this.authSrv.login(login);
  }
}
