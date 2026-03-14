import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { BroLockService } from './bro-lock.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { BroLockCreateRequestDto } from '@dto/bro-lock/bro-lock-manage/bro-lock-create-request.dto';
import { CommonSuccessResponseDto } from '@dto/common-success-response.dto';
import { commonSuccessResponse } from '@const/common-success-response';
import { CurrentUser } from 'src/common/decorators/current-user.decorators';
import { JwtPayload } from '@bro-types/jwt-payload';

@Controller('bro-lock')
export class BroLockController {
  constructor(private readonly broLockService: BroLockService) { }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createBroLock(
    @Body() params: BroLockCreateRequestDto,
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<CommonSuccessResponseDto> {
    await this.broLockService.createBroLock(params, currentUser);

    return commonSuccessResponse;
  }
}
