import { OrdersDbService, ProductsDbService } from '../../../db/db.module.js';
import type { OrderCreationDto } from '../../../shared/dto/order.creation-dto.js';
import { ConflictException } from '../../../shared/exceptions/conflict.exception.js';
import { NotFoundException } from '../../../shared/exceptions/not-found.exception.js';
import { CQRSCommand } from '../../../shared/types/cqrs/command.type.js';
import type { Decimal } from '../../../shared/types/decimal.type.js';
import { executeTransaction } from '../../../shared/utils/execute-transaction.util.js';

export class CreateOrderCommand extends CQRSCommand<OrderCreationDto> {
  constructor(protected readonly dto: OrderCreationDto) {
    super(dto);
  }
  
  async execute() {
    const response = await executeTransaction(async (transaction) => {
      const products = await ProductsDbService.fetchByIds(this.dto.products.map(x => x.productId), transaction);
      const order = await OrdersDbService.create(this.dto.customerId, transaction);
      
      let sum = 0;
      for (const prod of this.dto.products) {
        const product = products.find(p => p.id === prod.productId);
        if (!product) {
          throw new NotFoundException(`Product [${prod.productId}] not found`);
        }
        
        
        if (prod.amount === 0) continue; // skip zeroed items
        try {
          await ProductsDbService.sell(product.id, prod.amount, transaction);
        } catch (error) {
          if (error instanceof ConflictException) {
            throw new ConflictException(`Not enough Product [${prod.productId}] left. Requested [${prod.amount}] available [${product.stock}]`);
          }
          
          throw error;
        }
        
        sum += Number.parseFloat(product.price) * prod.amount;
        await OrdersDbService.createProduct({
          orderId: order.id,
          productId: product.id,
          amount: prod.amount,
          price: product.price,
          name: product.name,
          description: product.description,
        }, transaction);
      }
      
      order.price = sum.toString() as Decimal;
      await order.save({ transaction });
      
      return [order.id, sum];
    });
    
    
    
    return response;
  }
}
