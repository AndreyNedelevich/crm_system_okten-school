import { Injectable } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { AuthConfigService } from "../../../config/auth/configuration.service";
import { UserRepository } from "../../users/services/user.repository";
import { InvalidCredentialsException } from "../../../common/http";
import { IUserData } from "../../../common/models/interfaces";
import { UserMapper } from "../../users/services/user.mapper";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: AuthConfigService,
    private userRepository: UserRepository,
  )
  {
    super(
      {
        usernameField: "email",
        paaswordnameField:'password',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.accessTokenSecret,
      }
    );
  }
  async validate(email: string, password: string): Promise<IUserData> {
    const user = await this.userRepository.authorize(email, password);
    if (!user) {
      throw new InvalidCredentialsException();
    }
    return UserMapper.toUserData(user);
  }
}