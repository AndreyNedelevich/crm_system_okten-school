import { Injectable } from '@nestjs/common';

import { GroupRequestDto } from '../models/dtos/request';
import { GroupResponseDto } from '../models/dtos/response';
import { GroupsRepository } from './groups.repository';

@Injectable()
export class GroupsService {
  constructor(private readonly groupsRepository: GroupsRepository) {}
  async getAllOrders(): Promise<GroupResponseDto[]> {
    return await this.groupsRepository.getAllGroups();
  }
  async createNewGroup(newGroup: GroupRequestDto): Promise<void> {
    return await this.groupsRepository.createNewGroup(newGroup);
  }
}
