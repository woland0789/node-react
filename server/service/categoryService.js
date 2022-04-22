import ApiError from "../exceptions/apiError.js";
import { CategoryModel } from "../models/Category.js";
import CategoryDto from "../dtos/categoryDto.js";

class CategoryService{
    async getAllCategories() {
        const categoiries = await CategoryModel.find();
        return categoiries.map(x => { return new CategoryDto(x) });
    }

    async editCategory(category) {
        if (category.id !== 0) {
            const dbCategory = await CategoryModel.findById(category.id);
            dbCategory.name = category.name;
            dbCategory.type = category.type;
            const editedCategory = await dbCategory.save();
            return new CategoryDto(dbCategory);
        } else {
            const newCategory = await CategoryModel.create({ name: category.name, type: category.type });
            return new CategoryDto(newCategory);
        }
    }

    async removeCategory(id) {
        return await CategoryModel.deleteOne({ _id: id });
    }
}

export const categoryService = new CategoryService();