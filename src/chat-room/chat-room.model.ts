import { Schema, model } from 'mongoose';

const chatRoomSchema = new Schema({
    name: String,
    usersInside: [{ type: String }],
});

export const ChatRoom = model('ChatRoom', chatRoomSchema);
