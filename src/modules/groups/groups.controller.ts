import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GroupsEntity } from '../../database/entities/groups.entity';
import { GroupsService } from './services/groups.service';

@ApiTags('Groups')
@Controller()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all groups',
    type: GroupsEntity,
  })
  @Get('groups')
  async getOrdersList(): Promise<GroupsEntity[]> {
    return await this.groupsService.getAllOrders();
  }
}
