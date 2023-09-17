import { TokenResponseDto } from './token.response.dto';
import { ProfileDto, User_responseDto } from "../../../../users/models/dtos/response";
import { ApiProperty } from "@nestjs/swagger";

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