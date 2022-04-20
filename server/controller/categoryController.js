import { categoryService } from "../service/categoryService.js";

class CategoryController {
    async getCategories(req, res, next) {
        try {
            const categories = await categoryService.getAllCategories();
            res.json(categories);
        } catch (e) {
            next(e);
        }
    }

    async editCategory(req, res, next) {
        try {
            const { category } = req.body;
            const updatedCategory = await categoryService.editCategory(category);
            res.json(updatedCategory);
        } catch (e) {
            next(e);
        }
    }

    async removeCategory(req, res, next) {
        try {
            const removedCategory = await categoryService.removeCategory(req.params.id);
            res.json(removedCategory);
        } catch (e) {
            next(e);
        }
    }
}

export const categoryController = new CategoryController();