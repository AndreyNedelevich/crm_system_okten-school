import { OmitType } from '@nestjs/swagger';

import { CommentsResponseDto } from '../response';

export class CommentsRequestDto extends OmitType(CommentsResponseDto, [
  'id',
  'created_at',
]) {}
