import {
  ExecutionContext,
  Injectable, UnauthorizedException
} from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';

import { ROLES_KEY, SKIP_AUTH } from "../../../common/constans";
import { InvalidTokenException, NoPermissionException } from "../../../common/http";
import { TokenTypeEnum } from "../models";
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;

    const request = context.switchToHttp().getRequest();

    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (!accessToken) {
      throw new InvalidTokenException();
    }

    const payload = this.tokenService.verifyToken(
      accessToken,
      TokenTypeEnum.Access,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    console.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }

    if (!payload.role || !requiredRoles.some(role => payload.role.includes(role))) {
      throw new NoPermissionException();
    }

    return super.canActivate(context);
  }
}