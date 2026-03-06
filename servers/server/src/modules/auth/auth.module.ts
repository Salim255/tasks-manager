import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { JwtTokenService } from './service/jwt.token.service';
import { UserRepository } from '../user/repository/user.repository';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './service/auth.service';

@Module({
  controllers: [AuthController],
  providers: [JwtTokenService, AuthService, UserRepository],
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const getValue = <T>(key: string, fb: T): T =>
          configService.get<T>(key) ?? fb;
        return {
          secret: getValue('JWT_SECRET', ''),
          signOptions: { expiresIn: getValue('JWT_EXPIRATION', '1h') },
        };
      },
    }),
  ],
})
export class AuthModule {}
