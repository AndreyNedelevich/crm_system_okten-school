import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { GroupsEntity } from '../../../database/entities/groups.entity';

@Injectable()
export class GroupsRepository extends Repository<GroupsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(GroupsEntity, dataSource.manager);
  }

  public async getAllGroups(): Promise<GroupsEntity[]> {
    return await this.find();
  }
}
