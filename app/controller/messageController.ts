import { createSuccessResponse } from "../helpers/resHelpers"

export const sendMessage = async (payload: any) => {
    return createSuccessResponse('hello')
}

export const messageController = {
    sendMessage,
}