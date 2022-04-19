import { CategoryModel } from "../models/Category.js";

class CategoryService{
    async getAllCategories() {
        const categoiries = await CategoryModel.find();
        const tmp = categoiries.map(x => { return { name: x.name, id: x._id } });
        return tmp;
    }

    async editCategories(category) {
        if (category.id !== 0) {
            const dbCategory = await CategoryModel.findById(category.id);
            dbCategory.name = category.name;
            const editedCategory = await dbCategory.save();
            return { id: editedCategory.id, name: editedCategory.name };
        } else {
            const newCategory = await CategoryModel.create({ name: category.name });
            return { id: newCategory._id, name: newCategory.name };
        }
    }
}

export const categoryService = new CategoryService();