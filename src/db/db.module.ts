import type { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';
import { OrdersItemsEntity } from './entities/orders-items.entity.js';
import { OrdersEntity } from './entities/orders.entity.js';
import { ProductsEntity } from './entities/products.entity.js';
import { OrdersDbServiceClass } from './services/orders.db-service.js';
import { ProductsDbServiceClass } from './services/products.db-service.js';

const MODELS = [
  ProductsEntity,
  
  OrdersEntity,
  OrdersItemsEntity,
];

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT as Dialect || 'sqlite',
  
  username: process.env.DB_USERNAME || 'username',
  password: process.env.DB_PASSWORD || 'password',
  
  database: process.env.DB_NAME || 'db_name',
  host: process.env.DB_HOST || 'db.sqlite',
  port: Number.parseInt(process.env.DB_PORT || '0'),
  logging: process.env.DB_LOGGING ? console.log : undefined,
});


sequelize.addModels(MODELS);

export const init = async () => {
  // auto create new entities (when they do not exist)
  await sequelize.sync();
  
  const umzug = new Umzug({
    migrations: {
      glob: 'migrations/*.{js,ts,.sql}',
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
    
  });
  
  // umzug.on('migrating', ev => console.log({name: ev.name, path: ev.path})); // uncomment for logs from migrating
  // run migrations
  await umzug.up();
};

// Prepare Services for accessing database objects not allowing low-level access in high-level functions 
const ProductsServiceInstance = new ProductsDbServiceClass(ProductsEntity);
const OrdersServiceInstance = new OrdersDbServiceClass(OrdersEntity, OrdersItemsEntity);

export { ProductsServiceInstance as ProductsDbService };
export { OrdersServiceInstance as OrdersDbService };
export { sequelize };

export const disconnect = async () => {
  return sequelize.close();
};
