import { LoginRequestDto } from '@dto/login-request.dto';
import { LoginResponseDto } from '@dto/login-response.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { matchPassword } from 'src/users/user-password.helper';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersSrv: UsersService,
    private jwtSrv: JwtService,
  ) {}

  async singIn(login: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.usersSrv.findOne(login.name);
    // if (await matchPassword(user?.password, login.pass)) {
    //   throw new UnauthorizedException();
    // }

    // TEST MODE
    if (user?.password === login.pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.name };

    return {
      access_token: await this.jwtSrv.signAsync(payload, {
        secret: process.env.JWT_KEY,
      }),
    };
  }
}
