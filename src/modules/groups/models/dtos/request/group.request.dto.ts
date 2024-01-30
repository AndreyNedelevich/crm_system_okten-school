import { OmitType } from '@nestjs/swagger';

import { GroupResponseDto } from '../response';

export class GroupRequestDto extends OmitType(GroupResponseDto, ['id']) {}
