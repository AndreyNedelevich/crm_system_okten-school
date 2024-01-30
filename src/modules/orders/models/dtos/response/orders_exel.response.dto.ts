import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

import { OrdersResponseDto } from './orders.response.dto';

export class Orders_exelResponseDto extends OmitType(OrdersResponseDto, [
  'comments',
  'groups',
  'user',
]) {
  @ApiProperty({ nullable: true, example: 'Dec-2022' })
  @IsString()
  @Length(3, 20)
  groups: string | null;

  @ApiProperty({
    description: 'firstName user',
    example: 'John',
    nullable: true,
  })
  @IsString()
  manager: string | null;
}
