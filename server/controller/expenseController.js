import { expenseService } from "../service/expenseService.js";

class ExpenseController {
    async getExpenses(req, res, next) {
        try {
            const expenses = await expenseService.getExpenses();
            res.json(expenses);
        } catch (e) {
            next(e);
        }
    }

    async editExpense(req, res, next) {
        try {
            const { expense } = req.body;
            const updatedExpense = await expenseService.editExpense(expense);
            res.json(updatedExpense);
        } catch (e) {
            next(e);
        }
    }

    // async removeCategory(req, res, next) {
    //     try {
    //         const removedCategory = await categoryService.removeCategory(req.params.id);
    //         res.json(removedCategory);
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}

export const expenseController = new ExpenseController();