import { AbstractException } from './abstract-base.exception.js';

export class ConflictException extends AbstractException {
  code = 409;
  
  constructor(message?: string) {
    super(message || 'ConflictException');
  }
}
