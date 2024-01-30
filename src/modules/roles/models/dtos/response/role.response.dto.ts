import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { UserRoleEnum } from '../../enums';

export class RoleResponseDto {
  @ApiProperty({
    example: '1',
    description: 'Unique id',
  })
  @IsOptional()
  readonly id: number;

  @ApiProperty({
    example: UserRoleEnum.MANEGER,
    enum: UserRoleEnum,
    enumName: 'UserRoleEnum',
    description: 'MANAGER or ADMIN',
  })
  @IsEnum(UserRoleEnum)
  @IsNotEmpty()
  readonly value: UserRoleEnum;

  @ApiProperty({ required: false, nullable: true, example: 'Manager role' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly description?: string;
}
