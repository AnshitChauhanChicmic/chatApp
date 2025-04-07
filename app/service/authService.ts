import { Request, Response, NextFunction } from "express";
import utils from "../utils/utils";
import { MESSAGES } from "../utils/messages";
import { dbService } from "./dbService";
import { User } from "../models";

export const authService = async (request: Request | any, response: Response, next: NextFunction) => {
    let token: any = request.headers['authorization'];

    try {
        let userId = await utils.verify(token);
        const userDetails = await dbService.findAndUpdate(User, { _id: userId.id }, { $unset: { session: 1 } })
        if (token !== userDetails.session) {
            throw new Error();
        }
        request.user = userDetails
        next();

    } catch (error) {
        return response.status(401).send(MESSAGES.INVALID_USER);
    }
}