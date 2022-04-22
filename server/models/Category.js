import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Category = new Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true, default: 'expense' }
});

export const CategoryModel = model('Category', Category);