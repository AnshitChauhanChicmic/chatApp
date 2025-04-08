import { Socket } from "socket.io";

const sendPersonalMessage = (socket: Socket) => {
    socket.on('private-message', ({ msg, to }) => {
        socket.to(to).emit('pvt-msg', msg);
        socket.emit('pvt-msg', msg);
    })
}

const joinGroup = (socket: Socket) => {
    socket.on('join-group', ({group}) => {
        socket.join(group);
        socket.emit('group-joined', `you have joined ${group} `);
    })
}

export const socketService = {
    sendPersonalMessage,
    joinGroup
}