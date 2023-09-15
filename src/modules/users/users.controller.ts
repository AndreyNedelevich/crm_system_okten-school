import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Create_admin_requestDto } from './models/dtos/request';
import { Admin_responseDto } from './models/dtos/response';
import { UsersService } from './services/users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userServise: UsersService) {}
  @ApiOperation({ summary: 'Created user with adminRole' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Admin_responseDto })
  @Post('createAdmin')
  createUserAdmin(
    @Body() userDto: Create_admin_requestDto,
  ): Promise<Admin_responseDto> {
    return this.userServise.createAdminWithProfile(userDto);
  }
}
