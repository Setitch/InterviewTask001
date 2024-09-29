import type { OrderCreationDto } from '../../shared/dto/order.creation-dto.js';
import { NotImplementedYetException } from '../../shared/exceptions/not-implemented-yet.exception.js';
import type { BaseCommandOptions } from '../../shared/types/cqrs/base-command-options.type.js';
import type { CommandFactory } from '../../shared/types/cqrs/command-factory.type.js';
import { CreateOrderCommand } from './orders/create.order-command.js';

type Configuration = 
    BaseCommandOptions<'create', OrderCreationDto>
;

export const RequestOrdersCommandFactory: { getCommand: CommandFactory<Configuration> } = {
  getCommand: (config: Configuration) => {
    switch (config.name) {
      case 'create':
        return new CreateOrderCommand(config.data);
      default:
        throw new NotImplementedYetException(`Request Command [${(config as BaseCommandOptions).name}] is unknown`);
    }
  },
};
