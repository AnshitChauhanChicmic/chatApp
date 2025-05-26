import { Socket } from "socket.io";
import { dbService } from "./dbService";
import { Message, ChatModel } from "../models";
import { Types } from 'mongoose';

const sendPersonalMessage = (socket: Socket) => {
    socket.on('private-message', async ({ msg, to }) => {
        const message = await dbService.addDataToDb(
            Message,
            { _id: new Types.ObjectId(), message: msg }
        );
        await dbService.addDataToDb(
            ChatModel,
            { _id: message?._id, senderId: socket.user._id.toString(), receiverId: to }
        );
        socket.to(to).emit('pvt-msg', msg);
        socket.emit('pvt-msg', msg);
    })
}

const joinGroup = (socket: Socket) => {
    socket.on('join-group', async ({ group }) => {
        socket.join(group);
        await dbService.findAndUpdate(
            ChatModel,
            { group: group },
            { $addToSet: { _id: new Types.ObjectId(), senderId: socket.user._id.toString(), group: group } },
            { upsert: true, new: true }
        );

        socket.to(group).emit('group-joined', `${socket.user.name} joined ${group} `);
    })
}

const sendGroupMessage = (socket: Socket) => {
    socket.on('group-message', async ({ group, msg }) => {
        socket.join(group);
        const message = await dbService.addDataToDb(
            Message,
            { _id: new Types.ObjectId(), message: msg }
        );
        await dbService.addDataToDb(
            ChatModel,
            { _id: message?._id, senderId: socket.user._id.toString(), group: group }
        );
        socket.to(group).emit('grp-msg', msg);
    })
}

export const socketService = {
    sendPersonalMessage,
    joinGroup,
    sendGroupMessage
}