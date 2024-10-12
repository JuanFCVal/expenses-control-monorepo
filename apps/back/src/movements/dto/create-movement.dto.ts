import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';
import { WORTHINESS } from '../entities/movement.config';
import { Category } from 'src/categories/entities/category.entity';

export class CreateMovementDto {
  @IsNumber()
  amount: number;
  @IsString()
  description: string;
  @IsDateString()
  date: Date;
  @IsNumber()
  categoryId: number;
  @IsEnum(WORTHINESS)
  worthIt: WORTHINESS;
}
