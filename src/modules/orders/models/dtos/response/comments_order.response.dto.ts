import { ApiProperty } from '@nestjs/swagger';

export class CommentsOrderResponseDto {
  @ApiProperty({
    type: Number,
    nullable: false,
  })
  order_id: number;

  @ApiProperty({
    type: String,
    nullable: false,
  })
  comment: string;

  @ApiProperty({ nullable: false, type: Date })
  created_at: Date;

  @ApiProperty({
    type: 'object',
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string ' },
    },
    nullable: true,
  })
  user: {
    firstName?: string;
    lastName?: string;
  };
}
