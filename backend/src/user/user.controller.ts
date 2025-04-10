import { Controller, HttpCode, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('info')
  async getUserInfo() {

  }
}
