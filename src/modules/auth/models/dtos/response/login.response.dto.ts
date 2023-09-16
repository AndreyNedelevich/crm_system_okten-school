import { TokenResponseDto } from './token.response.dto';
import { User_responseDto } from "../../../../users/models/dtos/response";

export class LoginResponseDto {
  token: TokenResponseDto;
  user: User_responseDto;
}