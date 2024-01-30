import { OmitType } from '@nestjs/swagger';

import { Orders_queryRequestDto } from './orders_query.request.dto';

export class Orders_excel_queryRequestDto extends OmitType(
  Orders_queryRequestDto,
  ['page', 'limit'],
) {}
