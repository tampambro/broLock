import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { BroLockService } from './bro-lock.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { BroLockCreateRequestDto } from '@dto/bro-lock/bro-lock-manage/bro-lock-create-request.dto';

@Controller('bro-lock')
export class BroLockController {
  constructor(private readonly broLockService: BroLockService) { }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createBroLock(@Body() params: BroLockCreateRequestDto) {
    this.broLockService.createBroLock(params);
  }
}
