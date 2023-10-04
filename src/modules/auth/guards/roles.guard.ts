import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExtractJwt } from 'passport-jwt';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../../../common/constans';
import { NoPermissionException } from '../../../common/http';
import { TokenTypeEnum } from '../models';
import { TokenService } from '../services/token.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
      const payload = this.tokenService.verifyToken(
        accessToken,
        TokenTypeEnum.Access,
      );
      return requiredRoles.some((role) => payload.role.includes(role));
    } catch (e) {
      throw new NoPermissionException();
    }
  }
}
