import { Router } from 'express';
import { check } from 'express-validator';
import { signup } from './user.controller';

const userRouter = Router();

userRouter.post('/signup', [check('userName', 'userName should be a valid string').notEmpty().isString()], signup);

export default userRouter;
