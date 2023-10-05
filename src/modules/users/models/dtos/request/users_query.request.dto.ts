import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class Users_queryRequestDto {
  @ApiPropertyOptional({ default: 1 })
  @IsString()
  @IsOptional()
  page?: string;

  @ApiPropertyOptional({ default: 10 })
  @IsString()
  @IsOptional()
  limit?: string;
}
