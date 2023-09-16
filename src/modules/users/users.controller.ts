import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User_requestDto } from './models/dtos/request';
import { User_responseDto } from './models/dtos/response';
import { UsersService } from './services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userServise: UsersService) {}
  @ApiOperation({ summary: 'Create a user with administrator role' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User_responseDto })
  @Post('createAdmin')
  createUserAdmin(
    @Body() userDto: User_requestDto,
  ): Promise<User_responseDto> {
    return this.userServise.createAdminWithProfile(userDto);
  }
}
