import type { ProductCreationDto } from '../../shared/dto/product.creation-dto.js';
import type { ProductRestockDto } from '../../shared/dto/product.restock-dto.js';
import type { ProductSearchDto } from '../../shared/dto/product.search-dto.js';
import type { ProductSellDto } from '../../shared/dto/product.sell-dto.js';
import { NotImplementedYetException } from '../../shared/exceptions/not-implemented-yet.exception.js';
import type { BaseCommandOptions } from '../../shared/types/cqrs/base-command-options.type.js';
import type { CommandFactory } from '../../shared/types/cqrs/command-factory.type.js';
import { CreateProductCommand } from './products/create.product-command.js';
import { RestockProductCommand } from './products/restock.product-command.js';
import { SearchProductCommand } from './products/search.product-command.js';
import { SellProductCommand } from './products/sell.product-command.js';

type Configuration = 
    BaseCommandOptions<'create', ProductCreationDto>
  | BaseCommandOptions<'search', ProductSearchDto>
  | BaseCommandOptions<'restock', ProductRestockDto>
  | BaseCommandOptions<'sell', ProductSellDto>
;

export const RequestProductsCommandFactory: { getCommand: CommandFactory<Configuration> } = {
  getCommand: (config: Configuration) => {
    switch (config.name) {
      case 'create':
        return new CreateProductCommand(config.data);
      case 'search':
        return new SearchProductCommand(config.data);
      case 'restock':
        return new RestockProductCommand(config.data);
      case 'sell':
        return new SellProductCommand(config.data);
      default:
        throw new NotImplementedYetException(`Request Command [${(config as BaseCommandOptions).name}] is unknown`);
    }
  },
};
