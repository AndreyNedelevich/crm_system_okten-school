import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import {
  Course_formatEnum,
  Course_typeEnum,
  CourseEnum,
  StatusEnum,
} from '../../enums';

export class Orders_editRequestDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  surname?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ type: String, example: '050-500-26-24' })
  @IsString()
  @Length(3, 14)
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  sum?: number;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  alreadyPaid?: number;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  age?: number;

  @ApiPropertyOptional({
    enum: CourseEnum,
    enumName: 'CourseEnum',
  })
  @IsString()
  @IsOptional()
  @IsEnum(CourseEnum)
  course?: CourseEnum;

  @ApiPropertyOptional({
    enum: Course_formatEnum,
    enumName: 'Course_formatEnum',
  })
  @IsString()
  @IsOptional()
  @IsEnum(Course_formatEnum)
  course_format?: Course_formatEnum;

  @ApiPropertyOptional({
    enum: Course_typeEnum,
    enumName: 'Course_typeEnum',
  })
  @IsString()
  @IsOptional()
  @IsEnum(Course_typeEnum)
  course_type?: Course_typeEnum;

  @ApiPropertyOptional({
    enum: StatusEnum,
    enumName: 'StatusEnum',
  })
  @IsString()
  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  group?: number;
}
