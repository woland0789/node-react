import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Category = new Schema({
    name: { type: String, required: true },
});

export const CategoryModel = model('Category', Category);