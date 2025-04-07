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
    let pass = await utils.hashPass(payload.password);
    const userData = {
        name: payload.name,
        email: payload.email,
        password: pass
    }

    await dbService.addDataToDb(User, userData)
    return createSuccessResponse(MESSAGES.USER_SIGNUP);
}

const userLogin = async (payload: any) => {
    let user = await dbService.checkDataExistsInDb(
        User,
        { $and: [{ email: payload.email }, { isDeleted: { $exists: 0 } }] }
    )
    if (!user) {
        return createErrorResponse(MESSAGES.EMAIL_DOESNOT_EXIST);
    }
    let pass = await utils.checkPass(payload.password, user.password);
    if (!pass) {
        return createErrorResponse(MESSAGES.INVALID_PASSWORD)
    }

    let userId = user._id || '';
    let token = await utils.generateToken(userId.toString());
    await dbService.modifyData(User, { email: user.email }, { $set: { session: token } })
    return createSuccessResponse(MESSAGES.USER_LOGIN, { data: token })
}

const userLogout = async (payload: any) => {
    await dbService.modifyData(User, { email: payload.user.email }, { $unset: { session: 1 } });
    return createSuccessResponse(MESSAGES.USER_LOGOUT);
}

export const userController = {
    userSignup,
    userLogin,
    userLogout
}