import express from 'express';
import { createOrderHandler } from './handlers/create-order.handler.js';

const router = express.Router();

router.post('/', createOrderHandler);


export { router as ordersRoute };
