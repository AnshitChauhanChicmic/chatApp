import { Socket } from "socket.io";
import { dbService } from "./dbService";
import { Message, ChatModel } from "../models";

const sendPersonalMessage = (socket: Socket) => {
    socket.on('private-message', async ({ msg, to }) => {
        await dbService.addDataToDb(
            Message,
            { senderId: socket.user._id.toString(), receiverId: to, message: msg }
        )
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
            { $addToSet: { participants: socket.user._id } },
            { upsert: true, new: true }
        );

        socket.to(group).emit('group-joined', `${socket.user.name} joined ${group} `);
    })
}

const sendGroupMessage = (socket: Socket) => {
    socket.on('group-message', async ({ group, msg }) => {
        socket.join(group);
        await dbService.addDataToDb(
            Message,
            { senderId: socket.user._id.toString(), group: group, message: msg }
        )
        socket.to(group).emit('grp-msg', msg);
    })
}

export const socketService = {
    sendPersonalMessage,
    joinGroup,
    sendGroupMessage
}