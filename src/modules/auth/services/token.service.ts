import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

import {
  AccessTokenExpiredException,
  InvalidTokenException,
  RefreshTokenExpiredException,
} from '../../../common/http';
import { AuthConfigService } from '../../../config/auth/configuration.service';
import { UserRepository } from "../../users/services/user.repository";
import { JwtPayload, TokenError, TokenTypeEnum } from "../models";
import { ActionTokenResponseDto, TokenResponseDto } from "../models/dtos/response";
import { ActionTokenExpiredException } from "../../../common/http/exeptions/action-token-expired.exception";
import { InjectRedisClient, RedisClient } from "@webeleon/nestjs-redis";

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: AuthConfigService,
    @InjectRedisClient() private redisClient: RedisClient,

  ) {}

 async  generateAuthToken(payload: JwtPayload):Promise<TokenResponseDto> {
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

    const [access_token,refresh_token] = await Promise.all([
      this.redisClient.setEx(accessToken,14400, accessToken),
      this.redisClient.setEx(refreshToken,28800, refreshToken),
    ]);

    if(!access_token||!refresh_token){
      throw new BadRequestException('Tokens do not save');
    }

    return {
      accessToken,
      accessTokenExpires,
      refreshToken,
      refreshTokenExpires,
    };
  }

  public async generateActionToken(userId:string) {
    const actionTokenExpires = this.configService.actionTokenExpiration;

    const actionToken = this.generateToken(
      {id:userId},
      actionTokenExpires,
      TokenTypeEnum.Action,
    );
    const action_token=await this.redisClient.setEx(actionToken, 43200, actionToken);
    if(!action_token){
      throw new BadRequestException('Something wrong');
    }
    return {
      actionToken,
    };
  }

  async generateRefreshToken(refreshToken: string):Promise<TokenResponseDto>{
    const refreshTokenFromRedis =  await this.redisClient.get(refreshToken);
    if (!refreshTokenFromRedis||refreshToken !== refreshTokenFromRedis) {
      throw new InvalidTokenException();
    }
    const { id, email, role } = this.verifyToken(refreshToken, TokenTypeEnum.Refresh);
    return  this.generateAuthToken({ id, email, role });
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
    payload: Partial<JwtPayload> ,
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