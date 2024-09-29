import { ArrayMinSize, IsArray, IsString, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { OrderProductCreationDto } from './order-product.creation-dto.js';

export class OrderCreationDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  customerId!: string;
  
  @IsArray({})
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  products!: OrderProductCreationDto[];
  
  constructor(input: any) {
    this.customerId = input?.customerId;
    this.products = Array.isArray(input?.products) ? input.products.map((i: any) => Object.assign(new OrderProductCreationDto(), i)) : undefined;
  }
}
