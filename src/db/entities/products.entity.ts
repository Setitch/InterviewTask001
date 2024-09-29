import { Column, Model, DataType, Default, AllowNull, Table  } from 'sequelize-typescript';
import type { Decimal } from '../../shared/types/decimal.type.js';

export interface ProductCreationAttributes {
  name: string;
  description: string;
  price: number | Decimal;
  stock: number;
}

export interface ProductAttributes extends ProductCreationAttributes {
  id: number;
  price: Decimal;
  
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

@Table({
  paranoid: true,
})
export class ProductsEntity extends Model<ProductAttributes, ProductCreationAttributes> {
  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;
  
  @AllowNull(false)
  @Column(DataType.STRING)
  declare description: string;
  
  @AllowNull(false)
  @Column(DataType.DECIMAL({ decimals: 8, precision: 2 }))
  declare price: Decimal;
  
  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER({ unsigned: true }))
  declare stock: number;
}
