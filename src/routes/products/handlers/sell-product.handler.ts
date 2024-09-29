import type { Request, RequestHandler, Response } from 'express';
import { RequestProductsCommandFactory } from '../../../commands/application/request-products.command-factory.js';
import { ProductSellDto } from '../../../shared/dto/product.sell-dto.js';
import { validateRequest } from '../../../shared/middlewares/validate.middleware.js';

export const sellProductHandler: RequestHandler = async (req: Request, res: Response, next) => {
  const [error, dto] = await validateRequest(ProductSellDto, { id: Number.parseInt(req.params.id, 10), ...req.body });
  if (error) return next(error);
  
  try {
    const command = RequestProductsCommandFactory.getCommand({ name: 'sell', data: dto });
    
    const result = await command.execute();
    
    return res.status(200).json(result);
  } catch (err) {
    
    return next(err);
  }
};
