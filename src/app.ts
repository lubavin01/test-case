import express, { NextFunction, Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import mongoose from 'mongoose';
import userController from './user/user.route';
import chatRoomController from './chat-room/chat-room.route';
import jwtMiddleware from './jwt/jwt.middleware';

import ws from 'ws';
import { v4 as uuid } from 'uuid';

const { Server } = ws;

const APP_PORT = process.env.APP_PORT;
const MONGO_CONNECTION_URL = 'mongodb+srv://nikolay_l:qwerqweruiop123@cluster0.pp51y.mongodb.net/database?retryWrites=true&w=majority';

const wsConnections: Record<string, ws.WebSocket> = {};

(async function (): Promise<void> {
    try {
        await mongoose.connect(MONGO_CONNECTION_URL);
    } catch (e) {
        console.log('error connecting to MongoDb');
        console.log(e.message);
        return;
    }

    const wss = new Server({ port: 9000 });
    wss.on('connection', (connection) => {
        const id = uuid();
        wsConnections[id] = connection;
        console.log('connection', id);

        connection.on('message', (message) => {
            const strMessage = message.toString('utf-8');

            Object.values(wsConnections).forEach((currentWs) => {
                if (currentWs !== connection) {
                    currentWs.send(strMessage);
                }
            });
        });

        connection.on('close', () => {
            delete wsConnections[id];
            console.log('close', id);
        });
    });

    const app = express();
    app.use(json());
    app.use(urlencoded({ extended: false }));

    // controllers
    app.use('/users', userController);
    app.use('/chat-room', jwtMiddleware, chatRoomController);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err, req: Request, res: Response, next: NextFunction) => {
        res.status(500).send({ message: err.message }); // TODO beautiful error
    });

    app.listen(APP_PORT, () => console.log(`server is running on port ${APP_PORT}`));
})();
