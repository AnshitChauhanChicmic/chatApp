import { createErrorResponse, createSuccessResponse } from "../helpers/resHelpers"
import { User } from "../models"
import { dbService } from "../service/dbService"
import { MESSAGES } from "../utils/messages"
import utils from "../utils/utils"

const userSignup = async (payload: any) => {
    let checkUserExists = await dbService.checkDataExistsInDb(
        User,
        { $and: [{ email: payload.email }, { isDeleted: { $exists: 0 } }] }
    )

    if (checkUserExists) {
        return createErrorResponse(MESSAGES.EXISTING_EMAIL);
    }

    // let pass = utils.hashPass(payload.password);

    const userData = {
        name: payload.name,
        email: payload.email,
        password: payload.password
    }

    await dbService.addDataToDb(User, userData)

    return createSuccessResponse(MESSAGES.USER_SIGNUP);
}

export const userController = {
    userSignup
}