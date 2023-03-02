import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
