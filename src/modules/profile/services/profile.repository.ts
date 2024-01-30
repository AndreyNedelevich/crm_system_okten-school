import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ProfileEntity } from '../../../database/entities';

@Injectable()
export class ProfileRepository extends Repository<ProfileEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ProfileEntity, dataSource.manager);
  }
}
