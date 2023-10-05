import { ApiProperty } from '@nestjs/swagger';

export class OrderStatus {
  @ApiProperty({
    type: String,
    nullable: true,
    example: 'not status',
  })
  status: string;

  @ApiProperty({
    type: Number,
    nullable: true,
    example: 50,
  })
  count: number;
}

export class Orders_statisticResponseDto {
  @ApiProperty({
    type: Number,
    nullable: true,
    example: 500,
  })
  total_count: number;

  @ApiProperty({
    type: [OrderStatus],
    nullable: true,
    example: [
      {
        status: 'not status',
        count: 485,
      },
      {
        status: 'Agree',
        count: 12,
      },
      {
        status: 'New',
        count: 3,
      },
    ],
  })
  statuses: OrderStatus[];
}
