import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private redisSrv: RedisService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('access_token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_KEY,
    });
  }

  async validate(payload: any): Promise<any> {
    console.log('validate');

    const refreshToken = await this.redisSrv.getUserRefreshToken(payload.sub);
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, username: payload.username };
  }
}
