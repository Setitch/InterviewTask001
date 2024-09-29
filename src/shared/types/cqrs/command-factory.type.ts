import type { BaseCommandOptions } from './base-command-options.type.js';
import type { CQRSCommand } from './command.type.js';

export type CommandFactory<CONFIGS extends (BaseCommandOptions | BaseCommandOptions[])> = (config: CONFIGS) => CQRSCommand;
