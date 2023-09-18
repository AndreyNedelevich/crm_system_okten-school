import { Module } from '@nestjs/common';
import { AuthController } from "./auth.controller";
import { ConfigModule } from "@nestjs/config";
import configuration from "../../config/auth/configuration";
import { AuthConfigModule } from "../../config/auth/config.module";
import { UserRepository } from "../users/services/user.repository";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategies/local-strategy.service";
import { TokenService } from "./services/token.service";
import { PassportModule } from "@nestjs/passport";
import { AuthConfigService } from "../../config/auth/configuration.service";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./guards";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileEntity, RoleEntity, UserEntity } from "../../database/entities";
import { UsersModule } from "../users/users.module";
import { RedisModule } from "@webeleon/nestjs-redis";


const JwtFactory=(config: AuthConfigService)=>({
  secret:  config.accessTokenSecret,
  signOptions: {
    expiresIn: config.accessTokenExpiration,
    }
})

const JwtRegistrationOptions = {
  imports: [AuthConfigModule],
  useFactory: JwtFactory,
  inject: [AuthConfigService],
};

const AppGuardProvider={
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
}

@Module({
imports:[
  TypeOrmModule.forFeature([UserEntity, RoleEntity, ProfileEntity]),
  RedisModule.forRoot({
    url: 'redis://localhost:6379',
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
  providers:[
    UserRepository,
    AuthService,
    LocalStrategy,
    TokenService,
    AppGuardProvider,
    JwtStrategy,
  ]
})
export class AuthModule {}
