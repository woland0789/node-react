import CategoryDto from "./categoryDto.js";

export default class ExpenseDto{
    id;
    date;
    amount;
    categoryId;
    note;

    constructor(model) {
        this.id = model._id;
        this.date = model.date;
        this.amount = model.amount;
        this.note = model.note;
        this.categoryId = model.category._id;
    }
}