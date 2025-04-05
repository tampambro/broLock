import { CreateUserDto } from '@dto/create-user.dto';
import { GenerateEmailConfirmResponseDto } from '@dto/generate-email-confirm-response.dto';
import { LoginRequestDto } from '@dto/login-request.dto';
import { LoginResponseDto } from '@dto/login-response.dto';
import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailConfirmService } from 'src/email-confirm/email-confirm.service';
import { RedisService } from 'src/redis/redis.service';
import { matchPassword } from 'src/user/user-password.helper';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  readonly TOKEN_REFRESH_EXPIRATION = 7 * 24 * 60 * 60;
  readonly REFRESH_TOKEN_EXPIRATION = '30d';

  constructor(
    private usersSrv: UserService,
    private emailConfirmSrv: EmailConfirmService,
    private jwtSrv: JwtService,
    private redisSrv: RedisService,
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
    const accessToken = this.jwtSrv.sign(payload);
    const refreshToken = this.jwtSrv.sign(payload, {
      secret: process.env.JWT_REFRESH_KEY,
      expiresIn: this.REFRESH_TOKEN_EXPIRATION,
    });

    await this.redisSrv.setRefreshToken(
      user.id,
      this.TOKEN_REFRESH_EXPIRATION,
      refreshToken,
    );
    await this.usersSrv.sasveRefreshToken(user, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      userName: user.name,
      userId: user.id,
    };
  }

  async signup(
    params: CreateUserDto,
  ): Promise<GenerateEmailConfirmResponseDto> {
    const user = await this.usersSrv.create(params);

    const linkHash = await this.emailConfirmSrv.sendEmailConfirm(user.id);

    return { linkHash };
  }

  async refreshTokens(refreshToken: string) {
    const decoded = this.jwtSrv.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_KEY,
    });

    // Получается если, мы апу перезапустим, то нужно будет из базы достать все непросроченные токены и руками запихать их в redis, чтобы всем юзерам не пришлось перелогиниваться.
    const redisStoredToken = await this.redisSrv.getUserRefreshToken(
      decoded.sub,
    );

    if (!redisStoredToken) {
      throw new BadRequestException();
    }

    if (redisStoredToken !== refreshToken) {
      this.logout(decoded.sub);
      throw new BadRequestException();
    }

    const user = await this.usersSrv.findOne(decoded.sub);
    if (!user) {
      throw new BadRequestException();
    }

    const newAccessToken = this.jwtSrv.sign({
      sub: user.id,
      username: user.name,
    });
    const newRefreshToken = this.jwtSrv.sign(
      { sub: user.id, username: user.name },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: this.REFRESH_TOKEN_EXPIRATION,
      },
    );

    await this.redisSrv.setRefreshToken(
      user.id,
      this.TOKEN_REFRESH_EXPIRATION,
      newRefreshToken,
    );
    await this.usersSrv.sasveRefreshToken(user, newRefreshToken);

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }

  async logout(userId: number) {
    await this.redisSrv.deleteRefreshToken(userId);
    await this.usersSrv.invalidateRefreshToken(userId);
  }
}
