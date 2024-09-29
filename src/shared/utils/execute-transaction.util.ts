import type { Transaction } from 'sequelize';
import type { Sequelize } from 'sequelize-typescript';
import { sequelize } from '../../db/db.module.js';

export const executeTransaction = async <T>(autoCallback: (t: Transaction) => PromiseLike<T>, transaction: Transaction | undefined = undefined, sequelizeInstance: Sequelize = sequelize): Promise<T> => {
  if (transaction) {
    return autoCallback(transaction);
  }
  
  return sequelizeInstance.transaction<T>({ autocommit: true, logging: process.env.DB_TRANSACTION_LOGGING ? console.log : undefined }, async (x) => autoCallback(x));
};
