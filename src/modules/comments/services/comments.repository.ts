import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CommentsEntity } from '../../../database/entities';

@Injectable()
export class CommentsRepository extends Repository<CommentsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CommentsEntity, dataSource.manager);
  }
}
