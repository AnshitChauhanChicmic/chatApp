import { createErrorResponse, createSuccessResponse } from "../helpers/resHelpers"
import { User } from "../models"
import { dbService } from "../service/dbService"
import { MESSAGES } from "../utils/messages"
import utils, { commonFunction } from "../utils/utils"
import { Types } from 'mongoose';

const signup = async (payload: any) => {
    let checkUserExists = await dbService.checkDataExistsInDb(
        User,
        { $and: [{ email: payload.email }, { isDeleted: { $exists: 0 } }] }
    )
    if (checkUserExists) {
        return createErrorResponse(MESSAGES.EXISTING_EMAIL);
    }
    let pass = await utils.hashPass(payload.password);
    const userData = {
        _id: new Types.ObjectId(),
        name: payload.name,
        email: payload.email,
        password: pass
    };

    await dbService.addDataToDb(User, userData)
    return createSuccessResponse(MESSAGES.USER_SIGNUP);
}

const login = async (payload: any) => {
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
    await dbService.modifyData(
        User,
        { email: user.email }, { $set: { session: token } }
    )
    return createSuccessResponse(MESSAGES.USER_LOGIN, { data: token })
}

const logout = async (payload: any) => {
    await dbService.modifyData(
        User,
        { email: payload.user.email }, { $unset: { session: 1 } }
    );
    return createSuccessResponse(MESSAGES.USER_LOGOUT);
}

const forgotPassword = async (payload: any) => {
    let user = await dbService.checkDataExistsInDb(
        User,
        { $and: [{ email: payload.email }, { isDeleted: { $exists: 0 } }] }
    )
    if (!user) {
        return createErrorResponse(MESSAGES.EMAIL_DOESNOT_EXIST);
    }
    await commonFunction.sendOTP(user, commonFunction.generateOTP);
    return createSuccessResponse(MESSAGES.OTP_SENT);
}

const changePassword = async (payload: any) => {
    let pass = await utils.hashPass(payload.password);
    let userDetails = await dbService.findAndUpdate(
        User,
        { email: payload.email }, { $set: { password: pass } },
        {}
    )
    if (!userDetails) {
        return createErrorResponse(MESSAGES.EMAIL_DOESNOT_EXIST);
    }
    return createSuccessResponse(MESSAGES.PASSWORD_CHANGED)
}

const updateUser = async (payload: any) => {
    await dbService.modifyData(
        User,
        { email: payload.user.email }, { $set: { name: payload.name } }
    )
    return createSuccessResponse(MESSAGES.USER_UPDATED);
}


export const userController = {
    signup,
    login,
    logout,
    forgotPassword,
    changePassword,
    updateUser
}