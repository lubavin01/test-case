import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    userName: String,
});

export const User = model('User', userSchema);
