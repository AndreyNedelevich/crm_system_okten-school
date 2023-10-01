import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsEntity } from '../../database/entities/comments.entity';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './services/comments.repository';
import { CommentsService } from './services/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsEntity])],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
  exports: [],
})
export class CommentsModule {}
