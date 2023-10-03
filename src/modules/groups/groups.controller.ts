import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GroupsEntity } from '../../database/entities/groups.entity';
import { GroupRequestDto } from './models/dtos/request';
import { GroupResponseDto } from './models/dtos/response';
import { GroupsService } from './services/groups.service';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all groups',
    type: [GroupResponseDto],
  })
  @Get()
  async getOrdersList(): Promise<GroupResponseDto[]> {
    return await this.groupsService.getAllOrders();
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create new group',
    type: GroupResponseDto,
  })
  @Post()
  async createNewGroup(@Body() body: GroupRequestDto) {
    return await this.groupsService.createNewGroup(body);
  }
}
