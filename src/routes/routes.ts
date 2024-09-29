import { Router } from 'express';
import { ordersRoute } from './orders/index.js';
import { productsRoute } from './products/index.js';

const router = Router();

router.use('/products', productsRoute);
router.use('/orders', ordersRoute);

export { router as routes };
