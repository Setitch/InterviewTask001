import { AbstractException } from './abstract-base.exception.js';

export class NotImplementedYetException extends AbstractException {
  code = 500;
  
  constructor(message?: string) {
    super(message || 'Internal Server Exception');
  }
}
