import { ApiProperty } from '@nestjs/swagger';

import { User_responseDto } from '../../../../users/models/dtos/response';
import { TokenResponseDto } from './token.response.dto';

export class LoginResponseDto {
  @ApiProperty({
    description: 'access and refresh tokens',
    type: () => TokenResponseDto,
  })
  token: TokenResponseDto;
  @ApiProperty({
    description: 'User',
    type: () => User_responseDto,
  })
  user: User_responseDto;
}
