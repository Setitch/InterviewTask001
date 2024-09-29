import { ProductsDbService } from '../../../db/db.module.js';
import type { ProductCreationDto } from '../../../shared/dto/product.creation-dto.js';
import { ProductViewDto } from '../../../shared/dto/product.view-dto.js';
import { CQRSCommand } from '../../../shared/types/cqrs/command.type.js';

export class CreateProductCommand extends CQRSCommand<ProductCreationDto> {
  constructor(protected readonly dto: ProductCreationDto) {
    super(dto);
  }
  
  async execute() {
    return new ProductViewDto(await ProductsDbService.create(this.dto));
  }
}
