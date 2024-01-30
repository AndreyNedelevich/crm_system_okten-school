import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { InvalidCredentialsException } from '../../../common/http';
import { IUserData } from '../../../common/models/interfaces';
import { AuthConfigService } from '../../../config/auth/configuration.service';
import { UserMapper } from '../../users/services/user.mapper';
import { UserRepository } from '../../users/services/user.repository';
import { JwtPayload } from '../models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UserRepository,
    private configService: AuthConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.accessTokenSecret,
    });
  }

  async validate({ email }: JwtPayload): Promise<IUserData> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new InvalidCredentialsException();
    }
    return UserMapper.toUserData(user);
  }
}
//Если JwtAuthGuard применен к эндпоинту, где JWT-токен не обязателен, и токен не предоставлен, то JwtAuthGuard
// не выбросит ошибку, и запрос будет обработан. В этом случае request.user будет пустым (undefined), и вы сможете
// проверить его значение в вашем контроллере или сервисе.
