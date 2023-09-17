import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { UserRoleEnum } from "../../enums";

export class RoleResponseDto {
  // @ApiProperty({
  //   example: '1',
  //   description: 'Уникальный идентификатор',
  // })
  @IsOptional()
  readonly id: number;

  @ApiProperty({
    enum: UserRoleEnum,
    enumName: 'UserRoleEnum',
    example: UserRoleEnum.ADMIN,
    description: 'ADMIN or MANAGER',
  })
  @IsEnum(UserRoleEnum)
  @IsNotEmpty()
  readonly value: UserRoleEnum;

  @ApiProperty({ required: false, nullable: true, example: 'Main role' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly description?: string;
}
