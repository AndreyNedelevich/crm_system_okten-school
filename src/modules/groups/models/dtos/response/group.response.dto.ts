import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class GroupResponseDto {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @IsOptional()
  readonly id?: number;

  @ApiProperty({ required: true, nullable: false, example: 'Dec-2022' })
  @IsString()
  @Length(3, 20)
  @IsNotEmpty()
  name: string;
}
