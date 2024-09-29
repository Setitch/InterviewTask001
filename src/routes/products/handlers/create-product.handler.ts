import type { Request, RequestHandler, Response } from 'express';
import { RequestProductsCommandFactory } from '../../../commands/application/request-products.command-factory.js';
import { ProductCreationDto } from '../../../shared/dto/product.creation-dto.js';
import { validateRequest } from '../../../shared/middlewares/validate.middleware.js';

export const createProductHandler: RequestHandler = async (req: Request, res: Response, next) => {
  const [error, dto] = await validateRequest(ProductCreationDto, req.body);
  if (error) return next(error);
  
  try {
    const command = RequestProductsCommandFactory.getCommand({ name: 'create', data: dto });
    
    const result = await command.execute();
    
    return res.status(200).json(result);
  } catch (err) {
    
    return next(err);
  }
};
