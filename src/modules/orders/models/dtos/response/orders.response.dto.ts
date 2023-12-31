import { ApiProperty } from '@nestjs/swagger';

import { CommentsResponseDto } from '../../../../comments/models/dtos/response';
import { GroupResponseDto } from '../../../../groups/models/dtos/response';
import { User_responseDto } from '../../../../users/models/dtos/response';
import {
  Course_formatEnum,
  Course_typeEnum,
  CourseEnum,
  StatusEnum,
} from '../../enums';

//проавильно ли в респонсе ДТО предустмотрел возможность что во многих полях вернеться null.
export class OrdersResponseDto {
  @ApiProperty({
    type: BigInt,
    nullable: false,
  })
  id: bigint;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  name: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  surname: string | null;

  @ApiProperty({
    type: String,
    example: 'manager@gmail.com',
    nullable: true,
  })
  email: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    example: '0502563654',
  })
  phone: string | null;

  @ApiProperty({
    type: Number,
    nullable: true,
    example: 35,
  })
  age: number | null;

  @ApiProperty({
    enum: CourseEnum,
    enumName: 'CourseEnum',
    example: CourseEnum.FE,
    nullable: true,
  })
  course: string | null;

  @ApiProperty({
    enum: Course_formatEnum,
    enumName: 'Course_formatEnum',
    example: Course_formatEnum.static,
    nullable: true,
  })
  course_format: string | null;

  @ApiProperty({
    enum: Course_typeEnum,
    enumName: 'Course_typeEnum',
    example: Course_typeEnum.vip,
    nullable: true,
  })
  course_type: string | null;

  @ApiProperty({
    type: Number,
    nullable: true,
    example: 42000,
  })
  sum: number | null;

  @ApiProperty({
    type: Number,
    nullable: true,
    example: 15000,
  })
  alreadyPaid: number | null;

  @ApiProperty({
    type: String,
    nullable: true,
  })
  utm: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    example: 'target-05-2022',
  })
  msg: string | null;

  @ApiProperty({
    enum: StatusEnum,
    enumName: 'StatusEnum',
    example: StatusEnum.inWork,
    nullable: true,
  })
  status: string | null;

  @ApiProperty({ nullable: true, type: Date })
  created_at: Date;

  @ApiProperty({
    description: 'User with profile',
    type: () => User_responseDto,
  })
  user?: User_responseDto;

  @ApiProperty({
    description: 'Group',
    type: () => GroupResponseDto,
  })
  groups?: GroupResponseDto;

  @ApiProperty({
    description: 'Comments array',
    type: [CommentsResponseDto],
  })
  comments?: CommentsResponseDto[];
}
