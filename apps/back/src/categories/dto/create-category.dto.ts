import {
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsString,
  isBoolean,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { CategoryType } from '../entities/category.config';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  @IsOptional()
  active: boolean;
  @IsEnum(CategoryType)
  type: CategoryType;
  @IsOptional()
  @IsNumber()
  parentId?: number;
}
