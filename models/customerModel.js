import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: { type: String },
    },
    { timestamp: true },
);

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
