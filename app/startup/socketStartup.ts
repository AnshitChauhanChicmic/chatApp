import express from 'express';
import { Server } from "socket.io";
import { createServer } from 'http';
import utils from '../utils/utils';
import { dbService } from '../service/dbService';
import { User } from '../models';
import { socketService } from '../service/socketService';

declare module "socket.io" {
    interface Socket {
        user?: any;
    }
}

const app = express();
const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.use(async (socket, next) => {
    let token: any = socket.handshake.headers.auth;
    let userId = await utils.verify(token);
    const userDetails = await dbService.findAndUpdate(User, { _id: userId.id }, { $unset: { session: 1 } })
    // if (token !== userDetails.session) {
    //     socket.emit('error', 'Invalid token')
    // }
    socket.user = userDetails
    next();
})

io.on('connection', (socket) => {

    socket.join(socket.user._id.toString());

    // private message
    socketService.sendPersonalMessage(socket);

    // join group
    socketService.joinGroup(socket);

    // group message
    socketService.sendGroupMessage(socket);
    
})

export { app, server, io }