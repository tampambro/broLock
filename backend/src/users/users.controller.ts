import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CommonSuccessResponceDto } from '@dto/common-success-response.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('email-confirm')
  async generateEmailConfirm(
    userId: number,
  ): Promise<CommonSuccessResponceDto> {
    await this.usersService.sendEmailConfirm(userId);

    return { status: 'ok' };
  }
}
