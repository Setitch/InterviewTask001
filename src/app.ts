import express, { Router } from 'express';
import cors from 'cors';
import { init } from './db/db.module.js';
import { routes } from './routes/routes.js';
import { DATABASE_NOT_STARTED_CODE } from './shared/consts/application-start-errors.const.js';
import { NotFoundException } from './shared/exceptions/not-found.exception.js';
import { expressErrorHandler } from './shared/middlewares/error-handler.middleware.js';


try {
  await init();
} catch (error) {
  console.error('Could not start application due to database error: ', error);
  
  process.exit(DATABASE_NOT_STARTED_CODE);
}


const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

app.use('*', function notFoundExceptionHandler(_req, _res) {
  throw new NotFoundException();
});

app.use(expressErrorHandler(console));

export { app };
export { disconnect as disconnectDatabase } from './db/db.module.js';
