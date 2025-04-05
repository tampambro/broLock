import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as ioRedis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: ioRedis.Redis;

  onModuleInit() {
    this.client = new ioRedis.Redis({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    });
  }

  onModuleDestroy() {
    this.client.quit();
  }

  async setRefreshToken(
    userId: number,
    time: number,
    refreshToken: string,
  ): Promise<void> {
    this.client.setex(userId.toString(), time, refreshToken);
  }

  async getUserRefreshToken(userId: number): Promise<string | null> {
    return await this.client.get(userId.toString());
  }

  async deleteRefreshToken(userId: number): Promise<void> {
    await this.client.del(userId.toString());
  }
}
