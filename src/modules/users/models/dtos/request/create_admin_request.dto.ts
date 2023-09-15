import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class Create_admin_requestDto {
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
    required: true,
    description: 'min-5, max-15',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 15)
  password: string;

  @ApiProperty({
    required: true,
    description: 'min-5, max-18',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    required: true,
    description: 'min-5, max-18',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
