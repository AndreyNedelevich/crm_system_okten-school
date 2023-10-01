// import { ApiPropertyOptional } from '@nestjs/swagger';
// import { IsEnum, IsISO8601, IsOptional, IsString } from 'class-validator';
//
// import { OrderEnum } from '../../../../../common/models';
// import {
//   ColumnsEnum,
//   Course_formatEnum,
//   Course_typeEnum,
//   CourseEnum,
//   StatusEnum,
// } from '../../enums';
//
// export class CommentsResponseDto {
//   @ApiPropertyOptional({ default: 1 })
//   @IsString()
//   @IsOptional()
//   page?: string;
//
//   @ApiPropertyOptional({ default: 25 })
//   @IsString()
//   @IsOptional()
//   limit?: string;
//
//   @ApiPropertyOptional({
//     enum: ColumnsEnum,
//     enumName: 'ColumnsEnum',
//     default: ColumnsEnum.id,
//   })
//   @IsString()
//   @IsOptional()
//   @IsEnum(ColumnsEnum)
//   sort?: ColumnsEnum;
//
//   @ApiPropertyOptional({
//     enum: OrderEnum,
//     enumName: 'OrderEnum',
//     default: OrderEnum.ASC,
//   })
//   @IsString()
//   @IsOptional()
//   @IsEnum(OrderEnum)
//   order?: OrderEnum;
//
//   @ApiPropertyOptional({ type: String })
//   @IsString()
//   @IsOptional()
//   name?: string;
//
//   @ApiPropertyOptional({ type: String })
//   @IsString()
//   @IsOptional()
//   surname?: string;
//
//   @ApiPropertyOptional({ type: String })
//   @IsString()
//   @IsOptional()
//   email?: string;
//
//   @ApiPropertyOptional()
//   @IsString()
//   @IsOptional()
//   phone?: string;
//
//   @ApiPropertyOptional({ type: String })
//   @IsString()
//   @IsOptional()
//   age?: string;
//
//   @ApiPropertyOptional({
//     enum: CourseEnum,
//     enumName: 'CourseEnum',
//   })
//   @IsString()
//   @IsOptional()
//   @IsEnum(CourseEnum)
//   course?: CourseEnum;
//
//   @ApiPropertyOptional({
//     enum: Course_formatEnum,
//     enumName: 'Course_formatEnum',
//   })
//   @IsString()
//   @IsOptional()
//   @IsEnum(Course_formatEnum)
//   course_format?: Course_formatEnum;
//
//   @ApiPropertyOptional({
//     enum: Course_typeEnum,
//     enumName: 'Course_typeEnum',
//   })
//   @IsString()
//   @IsOptional()
//   @IsEnum(Course_typeEnum)
//   course_type?: Course_typeEnum;
//
//   @ApiPropertyOptional({
//     enum: StatusEnum,
//     enumName: 'StatusEnum',
//   })
//   @IsString()
//   @IsOptional()
//   @IsEnum(StatusEnum)
//   status?: StatusEnum;
//
//   @ApiPropertyOptional({ type: String })
//   @IsString()
//   @IsOptional()
//   manager?: string;
//
//   @ApiPropertyOptional({ type: String })
//   @IsString()
//   @IsOptional()
//   group?: string;
//
//   @ApiPropertyOptional({ type: Date })
//   @IsISO8601()
//   @IsOptional()
//   start_date?: Date;
//
//   @ApiPropertyOptional({ type: Date })
//   @IsISO8601()
//   @IsOptional()
//   end_date?: Date;
// }
