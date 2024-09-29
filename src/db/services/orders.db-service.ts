import { Transaction } from 'sequelize';
import { OrderCreationDto } from '../../shared/dto/order.creation-dto.js';
import { OrdersItemsCreationAttributes, OrdersItemsEntity } from '../entities/orders-items.entity.js';
import { OrdersEntity } from '../entities/orders.entity.js';

export class OrdersDbServiceClass {
  constructor(
    protected readonly orders: typeof OrdersEntity = OrdersEntity,
    protected readonly ordersItems: typeof OrdersItemsEntity = OrdersItemsEntity,
  ) {}
  
  async create(customerId: string, transaction?: Transaction) {
    return this.orders.create({
      customerId,
    }, { transaction });
  }
  
  async createProduct(dto: OrdersItemsCreationAttributes, transaction?: Transaction) {
    return this.ordersItems.create({
      ...dto,
    }, { transaction });
  }
}
