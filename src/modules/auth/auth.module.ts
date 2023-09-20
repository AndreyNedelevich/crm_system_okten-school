import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@webeleon/nestjs-redis';

import { AuthConfigModule } from '../../config/auth/config.module';
import configuration from '../../config/auth/configuration';
import { AuthConfigService } from '../../config/auth/configuration.service';
import { ProfileEntity, RoleEntity, UserEntity } from '../../database/entities';
import { UserRepository } from '../users/services/user.repository';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local-strategy.service';

const JwtFactory = (config: AuthConfigService) => ({
  secret: config.accessTokenSecret,
  signOptions: {
    expiresIn: config.accessTokenExpiration,
  },
});

const JwtRegistrationOptions = {
  imports: [AuthConfigModule],
  useFactory: JwtFactory,
  inject: [AuthConfigService],
};

//JwtAuthGuard - применяетья ко все ендпоинтам
const AppGuardProvider = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, ProfileEntity]),
    RedisModule.forRoot({
      url: process.env.REDIS_HOST,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(JwtRegistrationOptions),
    AuthConfigModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    UserRepository,
    AuthService,
    LocalStrategy,
    TokenService,
    AppGuardProvider, //будет прменен ко всем контролерам кроме тех у который стоит @SkipAuth()
    JwtStrategy,
  ],
})
export class AuthModule {}
