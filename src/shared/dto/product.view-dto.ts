import type { ProductAttributes, ProductsEntity } from '../../db/entities/products.entity.js';
import type { Decimal } from '../types/decimal.type.js';

export class ProductViewDto {
  id: number;

  name: string;

  description: string;

  price: Decimal;

  stock: number;
  
  constructor(dto: ProductViewDto | ProductsEntity | ProductAttributes) {
    this.id = dto.id;
    this.name = dto.name;
    this.description = dto.description;
    this.price = dto.price.toString() as Decimal;
    this.stock = dto.stock;
  }
}
