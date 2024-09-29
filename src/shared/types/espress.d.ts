import type { Logger } from './logger.interface.js';

declare global {
  namespace Express {
    export interface Request {
      logger?: Logger;
    }
  }
}
