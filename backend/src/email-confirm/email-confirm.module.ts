import { Module } from '@nestjs/common';
import { EmailConfirmService } from './email-confirm.service';

@Module({
  providers: [EmailConfirmService],
})
export class VerificationModule {}
