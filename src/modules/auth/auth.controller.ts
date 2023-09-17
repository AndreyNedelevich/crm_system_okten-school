import { Body, Controller, HttpStatus, Post, UseGuards } from "@nestjs/common";
import {
  ApiOperation, ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { IUserData } from "../../common/models/interfaces";

import { LocalAuthGuard } from './guards';
//import { RefreshTokenRequestDto } from './models/dtos/request';
import { ActionTokenResponseDto, LoginResponseDto } from "./models/dtos/response";
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { UserLoginRequestDto,UserCreateRequestDto } from "../users/models/dtos/request";
import { CurrentUser, SkipAuth } from "../../common/decorators";

 @SkipAuth()
@ApiTags('Auth')
@Controller( 'auth' )
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ description: 'User authentication' })
  @Post('sign-in')
  @ApiResponse({ status: HttpStatus.OK, description: 'Успешная авторизация', type: LoginResponseDto })
  async signIn(
    @CurrentUser() user: IUserData,
    @Body() dto: UserLoginRequestDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.login(user.userId);
  }

  @ApiOperation({ description: 'User registration' })
  @Post('admin/registr-manager')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Create Manager', type: ActionTokenResponseDto })
  async registrManager(@Body() dto: UserCreateRequestDto): Promise<ActionTokenResponseDto> {
    return await this.authService.registrManager(dto);
  }

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

