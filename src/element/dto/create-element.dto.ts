import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ElementType } from '../entities/element.entity';

export class CreateElementDto {
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
  @IsEnum(ElementType)
  @IsNotEmpty()
  type: ElementType;
}
