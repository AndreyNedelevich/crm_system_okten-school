import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User_requestDto } from './models/dtos/request';
import { User_responseDto } from './models/dtos/response';
import { UsersService } from './services/users.service';
import { LoginResponseDto } from "../auth/models/dtos/response";
import { SkipAuth } from "../../common/decorators";

@SkipAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userServise: UsersService) {}


  @ApiOperation({ summary: 'Create a user with administrator role' })
  @ApiResponse({ status: HttpStatus.CREATED, type: LoginResponseDto})
  @Post('createAdmin')
  createUserAdmin(
    @Body() userDto: User_requestDto,
  ): Promise<User_responseDto> {
    return this.userServise.createUserWithProfile(userDto);
  }
}
