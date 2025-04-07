import express from 'express';
import { Server } from "socket.io";
import { createServer } from 'http';

const app = express();
const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

export function socketConnection(event: string, message: any) {
    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);
        socket.on(event, message)
    })
    
}

export { app, server, io }