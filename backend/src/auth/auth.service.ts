import { LoginRequestDto } from '@dto/login-request.dto';
import { LoginResponseDto } from '@dto/login-response.dto';
import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { matchPassword } from 'src/user/user-password.helper';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersSrv: UserService,
    private jwtSrv: JwtService,
  ) {}

  async login(login: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.usersSrv.findOne(login.name);

    if (!(await matchPassword(user?.password, login.password))) {
      throw new UnauthorizedException();
    }

    if (!user.isMailConfirm) {
      throw new ForbiddenException();
    }

    const payload = { sub: user.id, username: user.name };

    return {
      access_token: await this.jwtSrv.signAsync(payload, {
        secret: process.env.JWT_KEY,
      }),
    };
  }
}
