import type { Request, RequestHandler, Response } from 'express';
import { RequestProductsCommandFactory } from '../../../commands/application/request-products.command-factory.js';
import { ProductSearchDto } from '../../../shared/dto/product.search-dto.js';
import { validateRequest } from '../../../shared/middlewares/validate.middleware.js';

export const listProductsHandler: RequestHandler = async (req: Request, res: Response, next) => {
  const [error, dto] = await validateRequest(ProductSearchDto, req.body);
  if (error) return next(error);
  
  try {
    const command = RequestProductsCommandFactory.getCommand({ name: 'search', data: dto });
    
    const result = await command.execute();
    
    return res.status(200).json(result);
  } catch (err) {
    
    return next(err);
  }
};
