import { PickType } from '@nestjs/swagger';

import { RoleResponseDto } from './role.response.dto';

export class CreateRoleDto extends PickType(RoleResponseDto, [
  'value',
  'description',
]) {}
