import Router from 'express';

import { body } from 'express-validator';
import { categoryController } from '../controller/categoryController.js';
import { expenseController } from '../controller/expenseController.js';
import { userController } from '../controller/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const apiRouter = new Router();

apiRouter.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userController.registration);


apiRouter.post('/login', userController.login);

apiRouter.get('/logout', userController.logout);
apiRouter.get('/refresh', userController.refresh);

apiRouter.get('/users', authMiddleware, userController.getUsers);

apiRouter.get('/categories', authMiddleware, categoryController.getCategories);
apiRouter.post('/categories/edit', authMiddleware, categoryController.editCategory);
apiRouter.delete('/categories/:id', authMiddleware, categoryController.removeCategory);

apiRouter.get('/expenses', authMiddleware, expenseController.getExpenses);
apiRouter.post('/expense', authMiddleware, expenseController.editExpense);

export const router = apiRouter; 