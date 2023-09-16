import { PickType } from '@nestjs/swagger';

import { User_requestDto } from "./user_request.dto";

export class UserLoginRequestDto extends PickType(User_requestDto , [
  'email',
  'password',
]) {}