import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { EmailConfirmModule } from 'src/email-confirm/email-confirm.module';

@Module({
  imports: [
    UserModule,
    EmailConfirmModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '30m' },
    }),
  ],
  exports: [AuthService],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
