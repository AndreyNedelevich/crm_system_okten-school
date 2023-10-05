import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Profile_responseDtoDto } from '../../../../profile/models/dtos/response';
import { RoleResponseDto } from '../../../../roles/models/dtos/response';

export class User_responseDto {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  readonly id: number;

  @ApiProperty({
    example: 'manager@gmail.com',
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
    type: () => Profile_responseDtoDto,
  })
  profile: Profile_responseDtoDto;

  @ApiProperty({
    description: 'User role',
    type: () => RoleResponseDto,
  })
  role: RoleResponseDto;
}
