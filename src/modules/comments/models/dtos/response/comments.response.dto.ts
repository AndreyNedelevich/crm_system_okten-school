import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CommentsResponseDto {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @IsOptional()
  readonly id?: number;

  @IsString()
  @IsNotEmpty()
  @Length(5)
  @ApiProperty({
    example: 'Some comment',
    required: true,
    description: 'min-5',
    nullable: false,
  })
  comment: string;

  @ApiProperty({ nullable: true, type: Date })
  created_at: Date;
}
