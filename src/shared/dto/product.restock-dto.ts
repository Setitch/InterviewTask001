import { IsInt, Min } from 'class-validator';

export class ProductRestockDto {
  // TODO Make proper transformer and use here
  @IsInt()
  @Min(0)
  id!: number;
  
  @IsInt()
  @Min(0)
  amount!: number;
}
