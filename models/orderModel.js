import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        date: { type: Date },
        customerNumber: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
        userNumber: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamp: true },
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
