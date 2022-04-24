import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        password: { type: String },
        hiredDate: { type: Date, required: true },
    },
    { timestamp: true },
);

const User = mongoose.model('User', userSchema);
export default User;
