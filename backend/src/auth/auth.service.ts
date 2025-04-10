import { CreateUserDto } from '@dto/create-user.dto';
import { GenerateEmailConfirmResponseDto } from '@dto/generate-email-confirm-response.dto';
import { LoginRequestDto } from '@dto/login-request.dto';
import { LoginResponseDto } from '@dto/login-response.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailConfirmService } from 'src/email-confirm/email-confirm.service';
import { RedisService } from 'src/redis/redis.service';
import { matchPassword } from 'src/user/user-password.helper';
import { UserService } from 'src/user/user.service';

interface Payload {
  sub: number;
  username: string;
}

@Injectable()
export class AuthService {
  readonly TOKEN_REFRESH_EXPIRATION = 7 * 24 * 60 * 60;
  readonly ACCESS_TOKEN_EXPIRATION = '15m';
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
      throw new BadRequestException();
    }

    if (!user.isMailConfirm) {
      throw new BadRequestException();
    }

    const payload = { sub: user.id, username: user.name };
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    await this.redisSrv.setRefreshToken(
      user.id,
      this.TOKEN_REFRESH_EXPIRATION,
      refreshToken,
    );
    await this.usersSrv.sasveRefreshToken(user, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
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

  private decodeRefreshToken(token: string): any {
    return this.jwtSrv.verify(token, {
      secret: process.env.JWT_REFRESH_KEY,
    });
  }

  async refreshToken(refreshToken: string) {
    const decoded = this.decodeRefreshToken(refreshToken);

    const redisStoredToken = await this.redisSrv.getUserRefreshToken(
      decoded.sub,
    );

    if (!redisStoredToken) {
      // User do not use account long time. His refresh_token died.
      if (decoded.sub) {
        this.logout(decoded.sub);
      }

      throw new BadRequestException();
    }

    const user = await this.usersSrv.findOne(decoded.sub);
    if (!user) {
      throw new BadRequestException();
    }

    const payload = { sub: user.id, username: user.name };
    const newAccessToken = this.generateAccessToken(payload);
    const newRefreshToken = this.generateRefreshToken(payload);

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

  async logout(refreshToken: string) {
    const decoded = this.decodeRefreshToken(refreshToken);

    const redisStoredToken = await this.redisSrv.getUserRefreshToken(
      decoded.sub,
    );
    if (redisStoredToken) {
      await this.redisSrv.deleteRefreshToken(decoded.sub);
      await this.usersSrv.invalidateRefreshToken(decoded.sub);
    } else {
      throw new BadRequestException();
    }
  }

  private generateAccessToken(payload: Payload): string {
    return this.jwtSrv.sign(payload, {
      secret: process.env.JWT_ACCESS_KEY,
      expiresIn: this.ACCESS_TOKEN_EXPIRATION,
    });
  }

  private generateRefreshToken(payload: Payload): string {
    return this.jwtSrv.sign(payload, {
      secret: process.env.JWT_REFRESH_KEY,
      expiresIn: this.REFRESH_TOKEN_EXPIRATION,
    });
  }
}
