import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common/decorators';
import { IUserData } from '../../common/models/interfaces';
import { User_responseDto } from './models/dtos/response';
import { UsersService } from './services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userServise: UsersService) {}

  @ApiOperation({ description: 'Get current user by token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get data current user',
    type: User_responseDto,
  })
  @Get('me')
  public async getCurrentUser(
    @CurrentUser() user: IUserData,
  ): Promise<User_responseDto> {
    return await this.userServise.currentUser(user.id);
  }
}
