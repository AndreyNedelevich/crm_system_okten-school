// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsString, Length } from 'class-validator';
//
// export class GroupRequestDto {
//   @ApiProperty({ required: true, nullable: false, example: 'Dec-2022' })
//   @IsString()
//   @Length(3, 20)
//   @IsNotEmpty()
//   name: string;

// }

import { OmitType } from '@nestjs/swagger';

import { GroupResponseDto } from '../response';

export class GroupRequestDto extends OmitType(GroupResponseDto, ['id']) {}
