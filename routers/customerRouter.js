import express from 'express';
import axios from 'axios';
import expressAsyncHandler from 'express-async-handler';
import Customer from '../models/customerModel.js';

const userRouter = express.Router();

userRouter.post(
    '/add-customers',
    expressAsyncHandler(async (req, res) => {
        const customers = [];
        for (let i = 0; i < 5; i++) {
            const result = await axios('https://api.namefake.com/').then((res) => res.data);
            const customer = new Customer({
                name: result.name,
                address: result.address,
            });
            const createdCustomer = await customer.save();
            customers.push(createdCustomer);
        }
        res.send({ message: 'Customer Created', customer: customers });
    }),
);

export default userRouter;
