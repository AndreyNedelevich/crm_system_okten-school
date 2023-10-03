import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import { CurrentUser, Roles, SkipAuth } from '../../common/decorators';
import { IUserData } from '../../common/models/interfaces';
import { UserLoginRequestDto } from '../users/models/dtos/request';
import { LocalAuthGuard, LogoutGuard } from './guards';
import {
  ActivateManagerRequestDto,
  RefreshTokenRequestDto,
} from './models/dtos/request';
import {
  ActionTokenResponseDto,
  LoginResponseDto,
  TokenResponseDto,
} from './models/dtos/response';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @SkipAuth()
  @ApiOperation({ description: 'User authentication' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная авторизация',
    type: LoginResponseDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(
    @CurrentUser() user: IUserData,
    // eslint-disable-next-line
    @Body() dto: UserLoginRequestDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.login(user.userId);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Log-out user from accaunt' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Log-out user from accaunt',
  })
  @UseGuards(AuthGuard(), LogoutGuard)
  @Post('logout')
  async logout(@Res() res: Response): Promise<Response> {
    return res.status(HttpStatus.OK).json('Manager was log-out from accaunt');
  }

  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get action token for activate manager' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'get activate token',
    type: ActionTokenResponseDto,
  })
  @Post('admin/get-activate-token/:userId')
  async getActivateToken(
    @Param('userId') userId: string,
  ): Promise<ActionTokenResponseDto> {
    return await this.authService.getActivateToken(userId);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Activate manager' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Manager is activated and password created',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Data saved successfully',
        },
      },
    },
  })
  // @HttpCode(HttpStatus.NO_CONTENT)
  @Post('activate/:token')
  async activateManager(
    @Param('token') token: string,
    @Body() dto: ActivateManagerRequestDto,
  ): Promise<{ message: string }> {
    return await this.authService.activateManager(token, dto);
  }

  @SkipAuth()
  @ApiOperation({ description: 'Renew access in the application' })
  @ApiUnauthorizedResponse({ description: 'Refresh token invalid or expired' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update tokens',
    type: TokenResponseDto,
  })
  @Post('refresh')
  async getNewToken(
    @Body() refreshTokenDto: RefreshTokenRequestDto,
  ): Promise<TokenResponseDto> {
    const { refreshToken } = refreshTokenDto;
    return await this.tokenService.generateRefreshToken(refreshToken);
  }
}
