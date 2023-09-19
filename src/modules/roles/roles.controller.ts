import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { RoleEntity } from '../../database/entities';
import { CreateRoleDto, RoleResponseDto } from './models/dtos/response';
import { UserRoleEnum } from "./models/enums";
import { RolesService } from './services/roles.service';
import { SkipAuth } from "../../common/decorators";

//@SkipAuth()
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiBearerAuth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The role has been successfully created.',
    type: RoleResponseDto,
  })
  create(@Body() dto: CreateRoleDto): Promise<RoleEntity> {
    return this.roleService.createRole(dto);
  }

  @ApiBearerAuth()
  @Get('/:value')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Response success',
    type: RoleResponseDto,
  })
  @ApiParam({
    name: 'value',
    enum: UserRoleEnum,
    description: 'Значение должно быть одно из перечисленных',
  })
  getByValue(@Param('value') value: UserRoleEnum): Promise<RoleEntity> {
    return this.roleService.getRoleByValue(value);
  }
}
