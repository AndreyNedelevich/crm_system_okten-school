import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { User_requestDto, ManagerCreateRequestDto } from "./models/dtos/request";
import { User_responseDto } from './models/dtos/response';
import { UsersService } from './services/users.service';
import { SkipAuth } from "../../common/decorators";

//@SkipAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userServise: UsersService) {}

@SkipAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a user with administrator role' })
  @ApiResponse({ status: HttpStatus.CREATED,description: "Create administrator", type: User_responseDto})
  @Post('admin/registr-admin')
  createUserAdmin(
    @Body() dto: User_requestDto,
  ): Promise<User_responseDto> {
    return this.userServise.createUserWithProfile(dto);
  }

@SkipAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a user with manager role" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Create Manager", type: User_responseDto })
  @Post("admin/registr-manager")
  async registrManager(@Body() dto: ManagerCreateRequestDto): Promise<User_responseDto> {
    return await this.userServise.createUserWithProfile(dto);
  }
}
