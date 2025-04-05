import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userSrv: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('access_token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_KEY,
    });
  }

  async validate(payload: any): Promise<any> {
    // Мне, кажеться, это не ок. Типав лазить в базу при каждой валидации токена(((
    // Я, думаю, тут есть смысл проверять refresh_token из  redis и всё.
    // const authUser = await this.userSrv.findOne(payload.sub);
    // if (!authUser) {
    //   throw new UnauthorizedException();
    // }
    // return authUser;
    return { userId: payload.sub, username: payload.username };
  }
}
