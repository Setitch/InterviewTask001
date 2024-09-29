import { AbstractException } from './abstract-base.exception.js';

export class ForbiddenException extends AbstractException {
  code = 401;
  
  constructor(message?: string) {
    super(message || 'ForbiddenException');
  }
}
