import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class ActivateManagerRequestDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 15)
  @ApiProperty({
    example: 'somepassword',
    required: true,
    description: 'min-5, max-15',
    nullable: false,
  })
  password: string;
}