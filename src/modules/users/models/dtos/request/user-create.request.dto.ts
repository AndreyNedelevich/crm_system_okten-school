import { PickType } from '@nestjs/swagger';

import { User_requestDto } from "./user_request.dto";

export class UserCreateRequestDto extends PickType(User_requestDto, [
  'firstName',
  'lastName',
  'email',
]) {}
