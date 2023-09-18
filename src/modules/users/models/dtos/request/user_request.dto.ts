import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class User_requestDto {
  @ApiProperty({
    example: 'admin@gmail.com',
    required: true,
    description: 'Unique email',
    nullable: false,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'admin',
    required: true,
    description: 'min-5, max-15',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 15)
  password: string;

  @ApiProperty({
    example: 'Andrey',
    required: true,
    description: 'min-5, max-18',
    nullable: false,
  })
  @IsString()
  @Length(5, 18)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Shevchenko',
    required: true,
    description: 'min-5, max-18',
    nullable: false,
  })
  @IsString()
  @Length(5, 18)
  @IsNotEmpty()
  lastName: string;
}
