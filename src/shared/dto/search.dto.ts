import { IsInt, IsOptional, Max } from 'class-validator';
import { GlobalSearchLimitConst } from '../consts/global-search-limit.const.js';

export class SearchDto {
  @IsInt()
  @IsOptional()
  page: number = 0;
  
  @IsInt()
  @IsOptional()
  @Max(GlobalSearchLimitConst)
  limit: number = GlobalSearchLimitConst;
}
