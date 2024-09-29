import { ProductsDbService } from '../../../db/db.module.js';
import type { ProductAttributes } from '../../../db/entities/products.entity.js';
import { ListViewDto } from '../../../shared/dto/list.view-dto.js';
import type { ProductSearchDto } from '../../../shared/dto/product.search-dto.js';
import { CQRSCommand } from '../../../shared/types/cqrs/command.type.js';



export class SearchProductCommand extends CQRSCommand<ProductSearchDto, ListViewDto<ProductAttributes>> {
  constructor(protected readonly dto: ProductSearchDto) {
    super(dto);
  }
  
  async execute() {
    const response = await ProductsDbService.find(this.dto);
    
    return new ListViewDto<ProductAttributes>({
      page: this.dto.page,
      limit: this.dto.limit,
      count: response.count,
      rows: response.rows.map(r => (r.get({ plain: true }))),
    });
  }
}
