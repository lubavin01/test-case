import { Server, WebSocket } from 'ws';
import { v4 as uuid } from 'uuid';
import { WS_PORT } from '../env';

const wsConnections: Record<string, WebSocket> = {};

export function wsServer(): void {
    const wss = new Server({ port: WS_PORT });

    wss.on('connection', (connection) => {
        const id = uuid();
        wsConnections[id] = connection;
        console.log('connection', id);

        connection.on('message', (message) => {
            const strMessage = message.toString('utf-8');

            Object.values(wsConnections).forEach((currentWs) => {
                currentWs.send(strMessage);
            });
        });

        connection.on('close', () => {
            delete wsConnections[id];
            console.log('close', id);
        });
    });
}
