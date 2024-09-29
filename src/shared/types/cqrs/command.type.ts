import type { BaseCommandOptions } from './base-command-options.type.js';

export abstract class CQRSCommand<Type extends any = any, Response extends object = any, Name extends string = string> {
  protected constructor(protected readonly config: BaseCommandOptions<Name, Type>['data']) {}
  
  abstract execute(): Promise<Response>;
}
