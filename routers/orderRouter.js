import express from 'express';
import { ObjectId } from 'mongodb';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post(
    '/add-orders',
    expressAsyncHandler(async (req, res) => {
        const order = new Order({
            date: new Date().toISOString(),
            customerNumber: req.body.customerNumber,
            userNumber: req.body.userNumber,
        });
        const createdOrder = await order.save();

        res.send({ message: 'Order Created', order: createdOrder });
        console.log('Order ' + createdOrder._id + ' created  at ' + new Date().toISOString())
    }),
);

orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const orderId = req.params.id;
        const result = await Order.findOne({ _id: ObjectId(orderId) });
        // console.log('result', result);
        res.send({ order: result });
    }),
);

export default orderRouter;
