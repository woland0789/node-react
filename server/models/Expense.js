import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Expense = new Schema({
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    note: { type: String, required: false },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' }
});

export const ExpenseModel = model('Expense', Expense);