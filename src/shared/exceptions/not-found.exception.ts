import { AbstractException } from './abstract-base.exception.js';

export class NotFoundException extends AbstractException {
  code = 404;
  
  constructor(message?: string) {
    super(message || 'Not Found');
  }
}
