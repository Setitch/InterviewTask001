import { ProductsDbService } from '../../../db/db.module.js';
import type { ProductSellDto } from '../../../shared/dto/product.sell-dto.js';
import { CQRSCommand } from '../../../shared/types/cqrs/command.type.js';

export class SellProductCommand extends CQRSCommand<ProductSellDto> {
  constructor(protected readonly dto: ProductSellDto) {
    super(dto);
  }
  
  async execute() {
    return ProductsDbService.sell(this.dto.id, this.dto.amount);
  }
}
