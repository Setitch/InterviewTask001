import { IsDefined, IsInt, Min } from 'class-validator';

export class OrderProductCreationDto {
  @IsInt()
  productId!: number;
  
  @IsInt()
  @Min(0)
  amount!: number;
}
