import { Module } from '@nestjs/common';

// import { TypeOrmModule } from '@nestjs/typeorm';
//
// import { GroupsEntity } from '../../database/entities/groups.entity';
import { GroupsController } from './groups.controller';
import { GroupsRepository } from './services/groups.repository';
import { GroupsService } from './services/groups.service';

@Module({
  // imports: [TypeOrmModule.forFeature([GroupsEntity])],
  imports: [],
  controllers: [GroupsController],
  providers: [GroupsService, GroupsRepository],
  exports: [],
})
export class GroupsModule {}
