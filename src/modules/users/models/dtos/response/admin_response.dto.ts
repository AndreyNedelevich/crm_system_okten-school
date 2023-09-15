import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { RoleResponseDto } from '../../../../roles/models/dtos/response';

export class ProfileDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'John',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
    example: 'Doe',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
export class Admin_responseDto {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @IsOptional()
  readonly id: number;

  @ApiProperty({
    example: 'amin@gmail.com',
    required: true,
    description: 'Уникальный email',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: Boolean,
    default: false,
    description:
      'Статус акаунта пользователя (true-активный, false-неактивный)',
  })
  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @ApiProperty({
    description: 'Профиль пользователя',
    type: () => ProfileDto,
  })
  profile: ProfileDto;

  @ApiProperty({
    description: 'Роль пользователя ',
    type: () => RoleResponseDto,
  })
  role: RoleResponseDto;
}
