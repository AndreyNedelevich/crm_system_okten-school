import { Body, Controller, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import {
  ApiOperation, ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { IUserData } from "../../common/models/interfaces";

import { LocalAuthGuard } from "./guards";
//import { RefreshTokenRequestDto } from './models/dtos/request';
import { ActionTokenResponseDto, LoginResponseDto } from "./models/dtos/response";
import { AuthService } from "./services/auth.service";
import { TokenService } from "./services/token.service";
import { UserLoginRequestDto, UserCreateRequestDto } from "../users/models/dtos/request";
import { CurrentUser, SkipAuth } from "../../common/decorators";
import { User_responseDto } from "../users/models/dtos/response";
import { UserRoleEnum } from "../roles/models/enums";
import { ActivateManagerRequestDto } from "./models/dtos/request";

@SkipAuth()
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {
  }


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

  @ApiOperation({ summary: "Create a user with manager role" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Create Manager", type: ActionTokenResponseDto })
  @Post("admin/registr-manager")
  async registrManager(@Body() dto: UserCreateRequestDto): Promise<User_responseDto> {
    return await this.authService.registrManager(dto);
  }

  @ApiOperation({ summary: "Get action token for activate manager" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Create Manager", type: ActionTokenResponseDto })
  @Post("admin/get-activate-token/:userId")
  async getActivateToken(@Param("userId") userId: string): Promise<ActionTokenResponseDto> {
    return await this.authService.getActivateToken(userId);
  }

  @ApiOperation({ summary: "Activate manager" })
  @ApiResponse({
      status: HttpStatus.OK,
      description: "Activate manager",
      content: {
        "text/plain": {
          example: "The manager is activated and password created"
        }
      }
    }
  )
  @Post("admin/activate/:token")
  async activateManager(@Param("token") token: string, @Body() dto: ActivateManagerRequestDto): Promise<string> {
    return await this.authService.activateManager(token, dto);
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

