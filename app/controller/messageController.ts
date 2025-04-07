import { createSuccessResponse } from "../helpers/resHelpers"
import { socketConnection } from "../startup/socketStartup"

export const sendMessage = async (payload: any) => {
    socketConnection('join-conversation', (data: string) => {
        console.log(data)
    })
    return createSuccessResponse('hello')
}

export const messageController = {
    sendMessage,
}