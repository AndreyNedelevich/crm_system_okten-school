import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// import { CurrentUser, SkipAuth } from '../../common/decorators';
import { IUserData } from "../../common/models/interfaces";
// import {
//   UserCreateRequestDto,
//   UserLoginRequestDto,
// } from '../user/models/dtos/request';
import { LocalAuthGuard } from './guards';
//import { RefreshTokenRequestDto } from './models/dtos/request';
import { LoginResponseDto } from "./models/dtos/response/login.response.dto";
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { UserLoginRequestDto } from "../users/models/dtos/request";
import { CurrentUser, SkipAuth } from "../../common/decorators";

 @SkipAuth()
@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ description: 'User authentication' })
  @Post('sign-in')
  async signIn(
    @CurrentUser() user: IUserData,
    @Body() dto: UserLoginRequestDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.login(user.userId);
  }

  // @ApiOperation({ description: 'User registration' })
  // @Post('sign-up')
  // async signUp(@Body() dto: UserCreateRequestDto): Promise<LoginResponseDto> {
  //   return await this.authService.signUp(dto);
  // }

  // @ApiOperation({ description: 'Renew access in the application' })
  // @ApiUnauthorizedResponse({ description: 'Refresh token invalid or expired' })
  // @Post('refresh')
  // async getNewToken(
  //   @Body() refreshTokenDto: RefreshTokenRequestDto,
  // ): Promise<TokenResponseDto> {
  //   const { refreshToken } = refreshTokenDto;
  //   return this.tokenService.generateRefreshToken(refreshToken);
  // }
}

