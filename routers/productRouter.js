import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.post(
    '/add-products',
    expressAsyncHandler(async (req, res) => {
        const product = new Product({
            productName: req.body.productName,
            expirationDate: new Date(req.body.date).toISOString(),
        });
        const createdProduct = await product.save();
        res.send({ message: 'Product Created', customer: createdProduct });
    }),
);

export default productRouter;
