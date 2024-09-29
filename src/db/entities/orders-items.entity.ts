import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import type { Decimal } from '../../shared/types/decimal.type.js';
import { OrdersEntity } from './orders.entity.js';
import { ProductsEntity } from './products.entity.js';

export interface OrdersItemsCreationAttributes {
  orderId: number;
  productId: number;
  amount: number;
  price: number | Decimal;
  name: string;
  description: string;
}

export interface OrdersItemsAttributes extends OrdersItemsCreationAttributes {
  id: never; // for easier usage with sequelize type system
  
  price: Decimal;
}

@Table({
  paranoid: false,
})
export class OrdersItemsEntity extends Model<OrdersItemsAttributes, OrdersItemsCreationAttributes> {
  @ForeignKey(() => OrdersEntity)
  declare orderId: number;
  
  @BelongsTo(() => OrdersEntity)
  declare order: OrdersEntity;
  
  @ForeignKey(() => ProductsEntity)
  declare productId: number;
  
  @BelongsTo(() => ProductsEntity)
  declare baseProduct: ProductsEntity;
  
  @Column(DataType.INTEGER)
  declare amount: number;
  
  // data optimization - this fields could be stored in additional table, and reuse if theirs data is exactly the same for storage optimization
  @Column(DataType.DECIMAL({ decimals: 8, precision: 2 }))
  declare price: Decimal;

  // data optimization - this fields could be stored in additional table, and reuse if theirs data is exactly the same for storage optimization
  @Column(DataType.STRING)
  declare name: string;
  
  // data optimization - this fields could be stored in additional table, and reuse if theirs data is exactly the same for storage optimization
  @Column(DataType.STRING)
  declare description: string;
}
