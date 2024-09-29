import type { ErrorRequestHandler } from 'express';
import { AbstractException } from '../exceptions/abstract-base.exception.js';
import type { Logger } from '../types/logger.interface.js';

export const expressErrorHandler: (logger: Logger) => ErrorRequestHandler = (logger: Logger) => (error, req, res, _next) => {
  if (error instanceof AbstractException || typeof error?.getError === 'function') {
    return res.status(error.code).json(error.getError());
  } else {
    if (req.logger) {
      req.logger.error(error);
    } else {
      logger.error(error);
    }
    
    return res.status(500).json({ statusCode: 500, error: 'Unknown: Internal Server Error' });
  }
};
