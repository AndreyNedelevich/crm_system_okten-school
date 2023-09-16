import { Module } from '@nestjs/common';
import { AuthController } from "./auth.controller";
import { ConfigModule } from "@nestjs/config";
import configuration from "../../config/auth/configuration";
import { AuthConfigModule } from "../../config/auth/config.module";
import { UserRepository } from "../users/services/user.repository";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategies/local-strategy.service";
import { TokenService } from "./services/token.service";

@Module({
imports:[
  ConfigModule.forRoot({
    load: [configuration],
  }),
  AuthConfigModule,
],
  controllers: [AuthController],
  providers:[UserRepository,AuthService,LocalStrategy,TokenService,]


})
export class AuthModule {}
