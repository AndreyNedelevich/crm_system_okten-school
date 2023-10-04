import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Roles, SkipAuth } from '../../common/decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import {
  ManagerCreateRequestDto,
  User_requestDto,
} from './models/dtos/request';
import { User_responseDto } from './models/dtos/response';
import { UsersService } from './services/users.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private userServise: UsersService) {}

  @SkipAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a user with administrator role' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create administrator',
    type: User_responseDto,
  })
  @Post('users/registr-admin')
  createUserAdmin(@Body() dto: User_requestDto): Promise<User_responseDto> {
    return this.userServise.createUserWithProfile(dto);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a user with manager role' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create Manager',
    type: User_responseDto,
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('users/registr-manager')
  async registrManager(
    @Body() dto: ManagerCreateRequestDto,
  ): Promise<User_responseDto> {
    return await this.userServise.createUserWithProfile(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User was baned',
        },
      },
    },
  })
  @ApiParam({
    name: 'orderId',
    type: String,
    description: 'id user',
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch('users/:userId/ban')
  async banUser(@Param('userId') userId: string): Promise<{ message: string }> {
    return await this.userServise.banUser(+userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Unban user' })
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User was unbaned',
        },
      },
    },
  })
  @ApiParam({
    name: 'orderId',
    type: String,
    description: 'id user',
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch('users/:userId/unban')
  async unbanUser(
    @Param('userId') userId: string,
  ): Promise<{ message: string }> {
    return await this.userServise.unbanUser(+userId);
  }
}
