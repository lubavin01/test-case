import { Response } from 'express';
import { ChatRoom } from './chat-room.model';
import { validationResult } from 'express-validator';
import { newRequest } from '../interfaces/new-request.interface';

export async function create(req: newRequest, res: Response): Promise<any> {
    try {
        const result = validationResult(req).formatWith(({ msg }) => msg as string);
        if (!result.isEmpty()) {
            return res.status(400).json(result.array());
        }

        const { name } = req.body;
        const { id } = req.jwtPayload;

        const chatRoom = new ChatRoom({ name, usersInside: [id] });
        await chatRoom.save();

        return res.status(201).json(chatRoom);
    } catch (e) {
        res.status(400);
        return res.json({ message: e.message });
    }
}

export async function join(req: newRequest, res: Response): Promise<any> {
    try {
        const result = validationResult(req).formatWith(({ msg }) => msg as string);
        if (!result.isEmpty()) {
            return res.status(400).json(result.array());
        }

        const roomId = req.body.roomId as string;
        const room = await ChatRoom.findById(roomId);
        if (!room) {
            return res.status(400).json({ message: `Chat room was not found by id "${roomId}"` });
        }

        const { id } = req.jwtPayload;
        if (room.usersInside.includes(id)) {
            return res.status(400).json({ message: `You are in this room already` });
        }
        room.usersInside.push(id);

        await room.save();
        return res.json(room);
    } catch (e) {
        res.status(400);
        return res.json({ message: e.message });
    }
}
