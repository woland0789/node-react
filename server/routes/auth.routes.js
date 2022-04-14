import Router from 'express';

import { body, check, validationResult } from 'express-validator';
import { userController } from '../controller/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = new Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userController.registration);


router.post('/login',userController.login);

router.get('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);


export const authRouter = router;