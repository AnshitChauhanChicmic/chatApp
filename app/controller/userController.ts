import { User } from "../models"
import { dbService } from "../service/dbService"

const userSignup = async (payload: any) => {
    // let checkUserExists = await dbService.checkDataExistsInDb(
    //     User,
    //     { $and: [{ email: payload.value.email }, { isDeleted: { $exists: 0 } }] }
    // )

    // if (checkUserExists) {

    // }

    // const userData = {
    //     name: payload.value.name,
    //     email: payload.value.email,
    //     password: payload.value.password
    // }

    return {statusCode: 200, data: 'User signed up successfully'}
}

export const userController = {
    userSignup
}