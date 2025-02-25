import { Module } from '@nestjs/common';
import { EmailConfirmService } from './email-confirm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailConfirm } from './email-confirm.entity';
import { EmailConfirmController } from './email-confirm.controller';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmailConfirm]), UserModule, EmailModule],
  exports: [EmailConfirmService],
  providers: [EmailConfirmService],
  controllers: [EmailConfirmController],
})
export class EmailConfirmModule {}
