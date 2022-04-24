import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        date: { type: Date },
        customerNumber: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
        productNumber: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    },
    { timestamp: true },
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
