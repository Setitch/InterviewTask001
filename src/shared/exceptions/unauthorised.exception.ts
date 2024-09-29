import { AbstractException } from './abstract-base.exception.js';

export class UnauthorisedException extends AbstractException {
  code = 403;
  
  constructor(message?: string) {
    super(message || 'UnauthorisedException');
  }
}
