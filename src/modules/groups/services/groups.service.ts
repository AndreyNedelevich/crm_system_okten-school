import { Injectable } from '@nestjs/common';

import { GroupsEntity } from '../../../database/entities/groups.entity';
import { GroupsRepository } from './groups.repository';

@Injectable()
export class GroupsService {
  constructor(private readonly groupsRepository: GroupsRepository) {}
  async getAllOrders(): Promise<GroupsEntity[]> {
    return await this.groupsRepository.getAllGroups();
  }
}
