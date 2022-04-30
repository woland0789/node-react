import $api from "../http";

export default class ExpenseService{
    static fetch() {
        return $api.get('/expenses');
    }

    static edit(expense) {
        return $api.post('/expense', { expense });
    }

    // static remove(id) {
    //     return $api.delete(`/categories/${id}`);
    // }
}