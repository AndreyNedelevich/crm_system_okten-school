import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  ApiPaginatedResponse,
  PaginatedDto,
  Roles,
  SkipAuth,
} from '../../common/decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Status_IsActiveEnum } from './models/dtos/enums/status_IsActive.enum';
import {
  ManagerCreateRequestDto,
  User_requestDto,
} from './models/dtos/request';
import { Users_queryRequestDto } from './models/dtos/request/users_query.request.dto';
import { User_responseDto } from './models/dtos/response';
import { UsersService } from './services/users.service';

@ApiTags('Admin')
@Roles('ADMIN')
@UseGuards(RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private userServise: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users with pagination format' })
  @ApiPaginatedResponse('entities', User_responseDto)
  @Get('users')
  async getUsersList(
    @Query() query: Users_queryRequestDto,
  ): Promise<PaginatedDto<User_responseDto>> {
    return await this.userServise.getAllUsers(query);
  }
  @SkipAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a user with administrator role' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create administrator',
    type: User_responseDto,
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
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
    name: 'userId',
    type: String,
    description: 'user id',
  })
  @Patch('users/:userId/ban')
  async banUser(@Param('userId') userId: string): Promise<{ message: string }> {
    return await this.userServise.ban_unbanUser(
      +userId,
      Status_IsActiveEnum.ban,
    );
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
    name: 'userId',
    type: String,
    description: 'user id',
  })
  @Patch('users/:userId/unban')
  async unbanUser(
    @Param('userId') userId: string,
  ): Promise<{ message: string }> {
    return await this.userServise.ban_unbanUser(
      +userId,
      Status_IsActiveEnum.unban,
    );
  }
}
