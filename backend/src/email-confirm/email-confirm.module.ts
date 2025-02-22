import { Module } from '@nestjs/common';
import { EmailConfirmService } from './email-confirm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailConfirm } from './email-confirm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailConfirm])],
  exports: [EmailConfirmService],
  providers: [EmailConfirmService],
})
export class EmailConfirmModule {}
