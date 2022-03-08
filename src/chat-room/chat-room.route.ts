import { Router } from 'express';
import { check } from 'express-validator';
import { create, join } from './chat-room.controller';

const chatRoomRouter = Router();

chatRoomRouter.post(
    '/create',
    [
        check('name', 'name should only contain latin letters')
            .isString()
            .custom((value: string) => {
                const search = value.match(/[A-Za-z]+/);
                const result = search && search.length && search[0] === value;
                console.log({ result });

                return result;
            }),
    ],
    create,
);

chatRoomRouter.post('/join', [check('roomId', 'roomId is invalid').isString().notEmpty()], join);

export default chatRoomRouter;
