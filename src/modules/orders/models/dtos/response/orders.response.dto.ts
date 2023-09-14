import { ApiProperty } from '@nestjs/swagger';

//проавильно ли в респонсе ДТО предустмотрел возможность что во многих полях вернеться null.
export class OrdersResponseDto {
  @ApiProperty()
  id: bigint;

  @ApiProperty({ nullable: true })
  name?: string | null;

  @ApiProperty({ nullable: true })
  surname?: string | null;

  @ApiProperty({ nullable: true })
  email?: string | null;

  @ApiProperty({ nullable: true })
  phone?: string | null;

  @ApiProperty({ nullable: true })
  age?: number | null;

  @ApiProperty({ nullable: true })
  course?: string | null;

  @ApiProperty({ nullable: true })
  course_format?: string | null;

  @ApiProperty({ nullable: true })
  course_type?: string | null;

  @ApiProperty({ nullable: true })
  sum?: number | null;

  @ApiProperty({ nullable: true })
  alredyPaid?: number | null;

  @ApiProperty({ nullable: true })
  utm?: string | null;

  @ApiProperty({ nullable: true })
  msg?: string | null;

  @ApiProperty({ nullable: true })
  status?: string | null;

  @ApiProperty({ nullable: true })
  created_at: Date;
}
