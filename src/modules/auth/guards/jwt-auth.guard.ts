import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { ExtractJwt } from 'passport-jwt';

import { SKIP_AUTH } from '../../../common/constans';
import { InvalidTokenException } from '../../../common/http';
import { TokenTypeEnum } from '../models';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
    @InjectRedisClient() private redisClient: RedisClient,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  canActivate = async (context: ExecutionContext) => {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;

    const request = context.switchToHttp().getRequest();
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (!accessToken) {
      throw new UnauthorizedException('Token is missing');
    }
    const acessTokenFromRedis = await this.redisClient.get(accessToken);

    if (accessToken !== acessTokenFromRedis) {
      throw new InvalidTokenException();
    }
    const payload = this.tokenService.verifyToken(
      accessToken,
      TokenTypeEnum.Access,
    );
    if (!payload) {
      throw new InvalidTokenException();
    }

    return await super.canActivate(context);
  };
}
