import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Will perform auth check in routes
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    avatar: { type: String, default: '' },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
