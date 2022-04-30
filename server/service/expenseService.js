import ExpenseDto from "../dtos/expenseDto.js";
import { CategoryModel } from "../models/Category.js";
import { ExpenseModel } from "../models/Expense.js";

class ExpenseService{
    async getExpenses() {
        const expenses = await ExpenseModel.find();
        return expenses.map(x => { return new ExpenseDto(x) });
    }

    async editExpense(expense) {
        const category = await CategoryModel.findById(expense.categoryId);
        if (expense.id !== 0) {
            
            const dbExpense = await ExpenseModel.findById(expense.id);
            dbExpense.date = expense.date;
            dbExpense.amount = expense.amount;
            dbExpense.note = expense.note;
            dbExpense.category = category;
            const editedExpense = await dbExpense.save();
            return new ExpenseDto(editedExpense);
        } else {
            const ex = {
                date: expense.date,
                amount: expense.amount,
                note: expense.note,
                category: category
            };
            const newExpense = await ExpenseModel.create(ex);
            return new ExpenseDto(newExpense);
        }
    }

    // async removeCategory(id) {
    //     return await CategoryModel.deleteOne({ _id: id });
    // }
}

export const expenseService = new ExpenseService();