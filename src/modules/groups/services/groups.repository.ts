import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { GroupsEntity } from '../../../database/entities/groups.entity';
import { GroupRequestDto } from '../models/dtos/request';
import { GroupResponseDto } from '../models/dtos/response';

@Injectable()
export class GroupsRepository extends Repository<GroupsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(GroupsEntity, dataSource.manager);
  }
  public async getAllGroups(): Promise<GroupResponseDto[]> {
    return await this.find();
  }
  public async createNewGroup(newGroup: GroupRequestDto): Promise<void> {
    const group = await this.findOne({
      where: { name: newGroup.name },
    });
    if (group) {
      throw new BadRequestException('Group with the same name already exists');
    }
    await this.save(newGroup);
  }
}
