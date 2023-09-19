import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ColumnsEnum } from "../../enums";
import { OrderEnum } from "../../../../../common/models";

export class Orders_queryResponseDto {
  @ApiPropertyOptional({
    enum: ColumnsEnum,
    enumName: 'ColumnsEnum'
  })
  @IsString()
  @IsOptional()
  @IsEnum(ColumnsEnum)
  sort?: string;

  @ApiPropertyOptional({
    enum: OrderEnum,
    enumName: 'OrderEnum'
  })
  @IsString()
  @IsOptional()
  @IsEnum(OrderEnum)
  order?: OrderEnum;

  // @ApiProperty()
  // @IsString()
  // @IsOptional()
  // search: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  page?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  limit?: string;

  // @ApiProperty()
  // @IsString()
  // @IsOptional()
  // status: string;
  //
  // @ApiProperty()
  // @IsString()
  // @IsOptional()
  // class: string;
}