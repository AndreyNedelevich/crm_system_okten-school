import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  AccessTokenExpiredException,
  InvalidTokenException,
  RefreshTokenExpiredException,
} from '../../../common/http';
import { AuthConfigService } from '../../../config/auth/configuration.service';
import { UserRepository } from "../../users/services/user.repository";
import { JwtPayload, TokenError, TokenTypeEnum } from '../models';
import { ActionTokenResponseDto, TokenResponseDto } from "../models/dtos/response";
import { ActionTokenExpiredException } from "../../../common/http/exeptions/action-token-expired.exception";

@Injectable()
export class TokenService {
  constructor(
    private usersRepository: UserRepository,
    private jwtService: JwtService,
    private configService: AuthConfigService,
  ) {}

  public generateAuthToken(payload: JwtPayload): TokenResponseDto {
    const accessTokenExpires = this.configService.accessTokenExpiration;
    const refreshTokenExpires = this.configService.refreshTokenExpiration;
    const accessToken = this.generateToken(
      payload,
      accessTokenExpires,
      TokenTypeEnum.Access,
    );
    const refreshToken = this.generateToken(
      payload,
      refreshTokenExpires,
      TokenTypeEnum.Refresh,
    );

    return {
      accessToken,
      accessTokenExpires,
      refreshToken,
      refreshTokenExpires,
    };
  }

  public generateActionToken(payload: JwtPayload): ActionTokenResponseDto {
    const accessTokenExpires = this.configService.actionTokenExpiration;
    const actionToken = this.generateToken(
      payload,
      accessTokenExpires,
      TokenTypeEnum.Action,
    );
    return {
      actionToken,
    };
  }

  public generateRefreshToken(refreshToken: string): TokenResponseDto {
    const { id, email,role } = this.verifyToken(refreshToken, TokenTypeEnum.Refresh);
    return this.generateAuthToken({ id, email,role });
  }

  public verifyToken(token: string, type: TokenTypeEnum): JwtPayload {
    try {
      const secret = this.getSecret(type);

      return this.jwtService.verify(token, { secret });
    } catch (name) {
      const isAccessExpired =
        name === TokenError.TokenExpiredError && type === TokenTypeEnum.Access;
      if (isAccessExpired) {
        throw new AccessTokenExpiredException();
      }
      const isRefreshExpired =
        name === TokenError.TokenExpiredError && type === TokenTypeEnum.Refresh;
      if (isRefreshExpired) {
        throw new RefreshTokenExpiredException();
      }
      const isActionExpired =
        name === TokenError.TokenExpiredError && type === TokenTypeEnum.Action;
      if (isActionExpired) {
        throw new ActionTokenExpiredException();
      }
      throw new InvalidTokenException();
    }
  }

  private generateToken(
    payload: JwtPayload,
    expiresIn: string,
    type: TokenTypeEnum,
  ): string {
    const secret = this.getSecret(type);
    // this.configService.accessTokenSecret; //???
    return this.jwtService.sign(payload, { expiresIn, secret });
  }

  private getSecret(type: TokenTypeEnum): string {
    switch (type) {
      case TokenTypeEnum.Access:
        return this.configService.accessTokenSecret;
      case TokenTypeEnum.Refresh:
        return this.configService.refreshTokenSecret;
      case TokenTypeEnum.Action:
        return this.configService.actionTokenSecret;
    }
  }
}