import { IsDecimal, IsInt, IsString, MaxLength, Min } from 'class-validator';
import type { Decimal } from '../types/decimal.type.js';

export class ProductCreationDto {
  @IsString()
  @MaxLength(50)
  name!: string;
  
  @IsString()
  @MaxLength(50)
  description!: string;
  
  @IsDecimal({ decimal_digits: '0,2' })
  price!: Decimal;
  
  @IsInt()
  @Min(0)
  stock!: number;
}
