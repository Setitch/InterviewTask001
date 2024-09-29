import type { Request, RequestHandler, Response } from 'express';
import { RequestOrdersCommandFactory } from '../../../commands/application/request-orders.command-factory.js';
import { OrderCreationDto } from '../../../shared/dto/order.creation-dto.js';
import { validateRequest } from '../../../shared/middlewares/validate.middleware.js';

export const createOrderHandler: RequestHandler = async (req: Request, res: Response, next) => {
  const [error, dto] = await validateRequest(OrderCreationDto, req.body);
  if (error) return next(error);
  
  try {
    const command = RequestOrdersCommandFactory.getCommand({ name: 'create', data: dto });
    const result = await command.execute();
    
    return res.status(200).json(result);
  } catch (err) {
    
    return next(err);
  }
};
