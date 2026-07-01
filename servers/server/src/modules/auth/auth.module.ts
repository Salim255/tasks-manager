import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { JwtTokenService } from './service/jwt.token.service';
import { UserRepository } from '../user/repository/user.repository';
import { DatabaseModule } from 'src/database/database.module';
import { AuthService } from './service/auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { TokenCookieService } from './service/token.cookie.service';
import { getEnvVar } from 'src/common/utils/utils';

@Module({
  controllers: [AuthController],
  providers: [
    JwtTokenService,
    AuthService,
    UserRepository,
    JwtAuthGuard,
    TokenCookieService
  ],
  exports: [JwtAuthGuard, JwtTokenService, TokenCookieService],
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        
        return {
          secret: getEnvVar<string>('JWT_SECRET', '', configService),
          signOptions: { expiresIn: getEnvVar('JWT_EXPIRATION', '1h', configService) },
        };
      },
    }),
  ],
})
export class AuthModule {}
