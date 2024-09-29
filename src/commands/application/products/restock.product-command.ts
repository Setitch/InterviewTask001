import { ProductsDbService } from '../../../db/db.module.js';
import type { ProductRestockDto } from '../../../shared/dto/product.restock-dto.js';
import { CQRSCommand } from '../../../shared/types/cqrs/command.type.js';

export class RestockProductCommand extends CQRSCommand<ProductRestockDto> {
  constructor(protected readonly dto: ProductRestockDto) {
    super(dto);
  }
  
  async execute() {
    return ProductsDbService.stock(this.dto.id, this.dto.amount);
  }
}
