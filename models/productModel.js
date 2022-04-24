import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        productName: { type: String },
        expirationDate: { type: Date, required: true },
    },
    { timestamp: true },
);

const Product = mongoose.model('Product', productSchema);
export default Product;
