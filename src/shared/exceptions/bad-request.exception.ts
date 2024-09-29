import { AbstractException } from './abstract-base.exception.js';

export class BadRequestException extends AbstractException {
  code = 400;
  
  constructor(message?: string, public readonly data?: Record<string, any>) {
    super(message || 'BadRequestException');
  }
}
