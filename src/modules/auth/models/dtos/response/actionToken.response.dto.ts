import { ApiProperty } from "@nestjs/swagger";

export class ActionTokenResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxOk6yJV_adQssw5', description: 'actionToken' })
  actionToken: string;
}