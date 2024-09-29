import type { ValidationError } from 'class-validator';
import { AbstractException } from './abstract-base.exception.js';

export class ClassValidatorException extends AbstractException {
  code = 400;
  
  constructor(protected readonly validationErrors: ValidationError[]) {
    super('BadRequest');
  }
  
  override getError() {
    return {
      statusCode: this.code,
      error: this.message,
      validationErrors: this.getData(),
    };
  }
  
  protected getData() {
    return ClassValidatorException.flattenErrors(this.validationErrors);
  }
  
  public static flattenErrors(validations: ValidationError[], previousName: string[] = []) {
    const ret: Record<string, any> = {};

    for (const v of validations) {
      if (!ret.hasOwnProperty(v.property)) ret[v.property] = [];
      
      if (Object.values(v.constraints || {}).length !== 0) {
        ret[[...previousName, v.property].join('.')] = Object.values(v.constraints || {});
      }

      if (v.children && v.children.length > 0) {
        const r = this.flattenErrors(v.children, [...previousName, v.property]);
        for (const prop in r) {
          if (!r.hasOwnProperty(prop)) continue;
          
          if (Array.isArray(r[prop]) && r[prop].length === 0) continue;
          ret[prop] = (ret[prop]) ? [...ret[prop], ...r[prop]] : r[prop];
        }
      }
      
      if (ret[v.property].length === 0) {
        delete ret[v.property];
      }
    }
    
    return ret;
  }
}
