import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import customerRouter from './routers/customerRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config('./.env');

const app = express();
app.use(cors()); //and this
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("process.env.MONGO_URI_TEST",process.env.MONGO_URI_TEST)
const mongoUrl = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/Franz'
const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl, {
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
app.use('/api/orders', orderRouter);
app.use('/api/customers', customerRouter);

const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Server is ready');
});
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

export default app
