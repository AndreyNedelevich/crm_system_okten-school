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
export class User_responseDto {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @IsOptional()
  readonly id: number;

  @ApiProperty({
    example: 'amin@gmail.com',
    required: true,
    description: 'Unique email',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: Boolean,
    default: false,
    description: 'User account status (true-активный, false-неактивный)',
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({
    description: 'User profile',
    type: () => ProfileDto,
  })
  profile: ProfileDto;

  @ApiProperty({
    description: 'User role',
    type: () => RoleResponseDto,
  })
  role: RoleResponseDto;
}
