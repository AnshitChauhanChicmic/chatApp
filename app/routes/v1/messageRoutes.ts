import { messageController } from "../../controller";

export const messageRoutes = [
    {
        method: 'GET',
        path: '/user/sendMessage',
        handler: messageController.sendMessage
    }
]