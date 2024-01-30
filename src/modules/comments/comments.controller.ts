import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CommentsService } from './services/comments.service';

@ApiTags('Comments')
@Controller()
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  // @ApiBearerAuth()
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Get all groups',
  //   type: GroupsEntity,
  // })
  // @Get('groups')
  //
  // async getOrdersList(): Promise<GroupsEntity[]> {
  //   return await this.groupsService.getAllOrders();
  // }
}
