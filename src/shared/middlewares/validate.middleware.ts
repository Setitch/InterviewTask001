import type { RequestHandler } from 'express';
import { validate } from 'class-validator';
import { ClassValidatorException } from '../exceptions/class-validator.exception.js';
import type { ClassRef } from '../types/class-ref.type.js';

const DataPositions = ['body', 'query'] as const;
type DataPosition = typeof DataPositions[number];

type ClassValidatorMiddleware = (validationClass: ClassRef, position: DataPosition, allowEmpty?: boolean) => RequestHandler;
type ClassValidatorHandler = <T extends ClassRef>(validationClass: T, data: any) => Promise<[ClassValidatorException | null, InstanceType<T>]>;

export const ValidateMiddleware: ClassValidatorMiddleware = (validationClass,  position, allowEmpty) => async (req, res, next) => {
  const requestPosition = position === 'body' ? 'body' : 'params';
  const data = req[requestPosition];
  
  if (allowEmpty && data) {
    req[requestPosition] = data;
    
    return next(null);
  }
  
  const incomingDto: typeof validationClass = Object.assign(new validationClass(...data));
  const validationErrors = await validate(incomingDto);
  if (validationErrors.length > 0) return next(new ClassValidatorException(validationErrors));
  
  req[requestPosition] = incomingDto;
  
  return next(null);
};

export const validateRequest: ClassValidatorHandler = async <T extends ClassRef>(validationClass: T, data: any) => {
  const incomingDto = validationClass.constructor.length === 0 ? Object.assign(new validationClass(), data) : new validationClass(data);
  const validationErrors = await validate(incomingDto, { skipUndefinedProperties: false, skipMissingProperties: false });
  
  if (validationErrors.length > 0) return [new ClassValidatorException(validationErrors), incomingDto];
  
  return [null, incomingDto];
};
