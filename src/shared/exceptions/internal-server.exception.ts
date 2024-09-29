import { AbstractException } from './abstract-base.exception.js';

export class InternalServerException extends AbstractException {
  code = 500;
  
  constructor(message?: string) {
    super(message || 'Internal Server Exception');
  }
}
