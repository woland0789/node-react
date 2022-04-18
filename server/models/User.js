import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
});

export const UserModel = model('User', User);