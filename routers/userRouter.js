import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';

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
        console.log('User ' + createdUser._id + ' Created at ' + new Date().toISOString())
    }),
);

userRouter.post(
    '/login',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ name: req.body.name });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    token: generateToken(user),
                });
                console.log('User ' + user._id + ' logged in at ' + new Date().toISOString())
                return;
            }
        }
        res.status(401).send({ message: 'Invalid email or password' });
    }),
);

export default userRouter;
