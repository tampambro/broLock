import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { UserInfoRequestDto } from '@dto/user-info-request.dto';
import { UserInfoResponseDto } from '@dto/user-info-response.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('info')
  async getUserInfo(
    @Body() params: UserInfoRequestDto,
  ): Promise<UserInfoResponseDto> {
    return await this.userService.getUserInfo(params);
  }
}
