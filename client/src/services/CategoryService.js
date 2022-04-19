import $api from "../http";

export default class CategoryService{
    static fetch() {
        return $api.get('/categories');
    }

    static edit(category) {
        return $api.post('/categories/edit', { category });
    }
}