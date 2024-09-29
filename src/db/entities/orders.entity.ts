import { AllowNull, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import type { Decimal } from '../../shared/types/decimal.type.js';
import { OrdersItemsEntity } from './orders-items.entity.js';

export interface OrdersCreationAttributes {
  customerId: string;
}

export interface OrdersAttributes extends OrdersCreationAttributes {
  products: OrdersItemsEntity[];
}


@Table({
  paranoid: false,
})
export class OrdersEntity extends Model<OrdersAttributes, OrdersCreationAttributes> {
  @AllowNull(false)
  @Column(DataType.STRING)
  declare customerId: string;
  
  @HasMany(() => OrdersItemsEntity)
  declare products: OrdersItemsEntity[];
  
  @Column(DataType.DECIMAL({ decimals: 10, precision: 2 }))
  declare price: Decimal;
}
