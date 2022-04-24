import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

const userRouter = express.Router();

userRouter.post(
    '/add-user',
    expressAsyncHandler(async (req, res) => {
        const user = new User({
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, 8),
            hiredDate: new Date().toISOString(),
        });
        const createdUser = await user.save();
        res.send({ message: 'User Created', user: createdUser });
    }),
);

export default userRouter;
