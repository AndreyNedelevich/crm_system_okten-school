import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GroupResponseDto {
  @ApiProperty({ required: true, nullable: false, example: 'Dec-2022' })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
