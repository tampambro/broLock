import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CommonSuccessResponceDto } from '@dto/common-success-response.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('email-confirm')
  async generateEmailConfirm(
    userName: string,
  ): Promise<CommonSuccessResponceDto> {
    await this.userService.sendEmailConfirm(userName);

    return { status: 'ok' };
  }
}
