import express from 'express';
import { createProductHandler } from './handlers/create-product.handler.js';
import { listProductsHandler } from './handlers/list-products.handler.js';
import { restockProductHandler } from './handlers/restock-product.handler.js';
import { sellProductHandler } from './handlers/sell-product.handler.js';

const router = express.Router();

router.get('/', listProductsHandler);
router.post('/', createProductHandler);
router.post('/:id/restock', restockProductHandler);
router.post('/:id/sell', sellProductHandler);

export { router as productsRoute };
