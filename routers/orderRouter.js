import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post(
    '/add-orders',
    expressAsyncHandler(async (req, res) => {
        const order = new Order({
            date: new Date().toISOString(),
            customerNumber: '6265d618d63f0a1c7c8c2ef6',
            productNumber: '6265d421289cda2e4892098e',
        });
        const createdOrder = await order.save();

        res.send({ message: 'Order Created', order: createdOrder });
    }),
);

export default orderRouter;
