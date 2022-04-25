import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import customerRouter from './routers/customerRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();
const app = express();
app.use(cors()); //and this
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Franz', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

connectDB();
app.use('/api/users', userRouter);
app.use('/api/customers', customerRouter);
app.use('/api/orders', orderRouter);

const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Server is ready');
});
app.listen(port, () => {
    console.log(`Server starting at ${port}`);
});
