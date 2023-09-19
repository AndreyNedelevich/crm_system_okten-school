import { Body, Controller, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation, ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { IUserData } from "../../common/models/interfaces";

import { LocalAuthGuard } from "./guards";
import { ActionTokenResponseDto, LoginResponseDto, TokenResponseDto } from "./models/dtos/response";
import { AuthService } from "./services/auth.service";
import { TokenService } from "./services/token.service";
import { UserLoginRequestDto } from "../users/models/dtos/request";
import { CurrentUser, SkipAuth } from "../../common/decorators";
import { ActivateManagerRequestDto, RefreshTokenRequestDto } from "./models/dtos/request";


@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {
  }

  @SkipAuth()
  @ApiOperation({ description: "User authentication" })
  @ApiResponse({ status: HttpStatus.OK, description: "Успешная авторизация", type: LoginResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post("sign-in")
  async signIn(
    @CurrentUser() user: IUserData,
    @Body() dto: UserLoginRequestDto
  ): Promise<LoginResponseDto> {
    return await this.authService.login(user.userId);
  }

  //@SkipAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get action token for activate manager" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "get activate toke", type: ActionTokenResponseDto })
  @Post("admin/get-activate-token/:userId")
  async getActivateToken(@Param('userId') userId: string): Promise<ActionTokenResponseDto> {
    return await this.authService.getActivateToken(userId);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: "Activate manager" })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Manager is activated and password created',
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       message: {
  //         type: 'string',
  //         example: 'Data saved successfully',
  //       },
  //     },
  //   },
  // })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post("admin/activate/:token")
  async activateManager(@Param("token") token: string, @Body() dto: ActivateManagerRequestDto): Promise<{message:string}> {
    return await this.authService.activateManager(token, dto);
  }

  @SkipAuth()
  @ApiOperation({ description: 'Renew access in the application' })
  @ApiUnauthorizedResponse({ description: 'Refresh token invalid or expired' })
  @ApiResponse({ status: HttpStatus.OK, description: "Update tokens", type: TokenResponseDto })
  @Post('refresh')
  async getNewToken(
    @Body() refreshTokenDto: RefreshTokenRequestDto,
  ): Promise<TokenResponseDto> {
    const { refreshToken } = refreshTokenDto;
    return this.tokenService.generateRefreshToken(refreshToken);
  }
}

