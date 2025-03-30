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
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GenerateEmailConfirmResponseDto } from '@dto/generate-email-confirm-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authSrv: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('guard-test')
  test() {
    return 'Guard at the post';
  }

  @HttpCode(201)
  @Post('signup')
  async singup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<GenerateEmailConfirmResponseDto> {
    return await this.authSrv.signup(createUserDto);
  }

  @HttpCode(200)
  @Post('login')
  singIn(@Body() login: LoginRequestDto) {
    return this.authSrv.login(login);
  }
}
