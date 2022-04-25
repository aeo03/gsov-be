import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';
import User from '../models/userModel.js';

const userRouter = express.Router();

userRouter.post(
    '/login',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ name: req.body.name });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: 'Invalid email or password' });
    }),
);

userRouter.post(
    '/add-user',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({name:req.body.name})
      console.log("isUserExists",user)
      if(!user){
        const newUser = new User({
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, 8),
            hiredDate: new Date().toISOString(),
        });
        const createdUser = await newUser.save();
        res.status(201).send({ message: 'User Created', user: createdUser });
      }
      else{
        res.status(400).send({ message: 'User is already in use' });
      }
    }),
);

export default userRouter;
