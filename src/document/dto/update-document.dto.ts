import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateDocumentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(5)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  projectId: number;

  @ApiProperty()
  @IsNotEmpty()
  elements: Record<number, number>;
}
