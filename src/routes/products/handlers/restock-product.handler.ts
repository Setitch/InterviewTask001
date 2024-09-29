import type { Request, RequestHandler, Response } from 'express';
import { RequestProductsCommandFactory } from '../../../commands/application/request-products.command-factory.js';
import { ProductRestockDto } from '../../../shared/dto/product.restock-dto.js';
import { validateRequest } from '../../../shared/middlewares/validate.middleware.js';

export const restockProductHandler: RequestHandler = async (req: Request, res: Response, next) => {
  const [error, dto] = await validateRequest(ProductRestockDto, { id: Number.parseInt(req.params.id, 10), ...req.body });
  if (error) return next(error);
  
  try {
    const command = RequestProductsCommandFactory.getCommand({ name: 'restock', data: dto });
    
    const result = await command.execute();
    console.log('r', result);
    
    return res.status(200).json(result);
  } catch (err) {
    
    return next(err);
  }
};
