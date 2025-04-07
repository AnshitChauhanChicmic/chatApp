import { userController } from "../../controller";
import joi from 'joi';

export const userRoutes = [
    {
        method: 'POST',
        path: '/user/signup',
        joiSchemaForSwaggers: {
            group: 'user',
            description: 'register a new user',
            model: 'UserRegister',
            body: joi.object({
                name: joi.string().required(),
                email: joi.string().email().required(),
                password: joi.string().required()
            })
        },
        handler: userController.userSignup
    },
    {
        method: 'POST',
        path: '/user/login',
        joiSchemaForSwaggers: {
            group: 'user',
            description: 'login a new user',
            model: 'UserLogin',
            body: joi.object({
                email: joi.string().email().required(),
                password: joi.string().required()
            })
        },
        handler: userController.userLogin
    },
    {
        method: 'POST',
        path: '/user/logout',
        auth: true,
        handler: userController.userLogout
    }
]