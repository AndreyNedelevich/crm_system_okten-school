import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { RolesEnum } from '../../enums';

export class RoleResponseDto {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор',
  })
  @IsOptional()
  readonly id: number;

  @ApiProperty({
    enum: RolesEnum,
    enumName: 'Enum',
    example: RolesEnum.ADMIN,
    description: 'ADMIN or MANAGER',
  })
  @IsEnum(RolesEnum)
  @IsNotEmpty()
  readonly value: RolesEnum;

  @ApiProperty({ required: false, nullable: true, example: 'Main role' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly description?: string;
}
