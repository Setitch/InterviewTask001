import { IsOptional, IsString } from 'class-validator';
import { SearchDto } from './search.dto.js';

export class ProductSearchDto extends SearchDto {
  @IsString()
  @IsOptional()
  name?: string;
}
