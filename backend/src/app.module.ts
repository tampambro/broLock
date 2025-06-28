import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { EmailConfirmModule } from './email-confirm/email-confirm.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import { BroLockModule } from './bro-lock/bro-lock.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*{.ts,.js}'],
    }),
    AuthModule,
    UserModule,
    EmailModule,
    EmailConfirmModule,
    ProfileModule,
    BroLockModule,
  ],
  controllers: [AppController, AuthController, ProfileController],
  providers: [AppService],
})
export class AppModule {}
