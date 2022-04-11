import Router from 'express';
import { UserSchema } from '../models/User.js';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { userController } from '../controller/userController.js';

const router = new Router();

router.post('/registration',
    [
        check('email', 'Uncorrect email').isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({ min: 3, max: 12 })
    ],
    userController.registration);


router.post('/login',userController.login);

router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);


export const authRouter = router;