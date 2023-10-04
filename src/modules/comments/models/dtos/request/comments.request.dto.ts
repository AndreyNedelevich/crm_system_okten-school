// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsString, Length } from 'class-validator';
//
// export class CommentsRequestDto {
//   @IsString()
//   @IsNotEmpty()
//   @Length(5)
//   @ApiProperty({
//     example: 'Some comment',
//     required: true,
//     description: 'min-5',
//     nullable: false,
//   })
//   comment: string;
// }

import { OmitType } from '@nestjs/swagger';

import { CommentsResponseDto } from '../response';

export class CommentsRequestDto extends OmitType(CommentsResponseDto, [
  'id',
  'created_at',
]) {}
