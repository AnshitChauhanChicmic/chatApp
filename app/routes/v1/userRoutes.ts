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
        handler: userController.signup
    },
    {
        method: 'POST',
        path: '/user/login',
        joiSchemaForSwaggers: {
            group: 'user',
            description: 'login a user',
            model: 'UserLogin',
            body: joi.object({
                email: joi.string().email().required(),
                password: joi.string().required()
            })
        },
        handler: userController.login
    },
    {
        method: 'POST',
        path: '/user/logout',
        auth: true,
        handler: userController.logout
    },
    {
        method: 'POST',
        path: '/user/forgotPassword',
        joiSchemaForSwaggers: {
            group: 'user',
            description: 'forgot password',
            model: 'Forgot Password',
            body: joi.object({
                email: joi.string().email().required()
            })
        },
        handler: userController.forgotPassword
    },
    {
        method: 'POST',
        path: '/user/changePassword',
        joiSchemaForSwaggers: {
            group: 'user',
            description: 'forgot password',
            model: 'Forgot Password',
            body: joi.object({
                email: joi.string().email().required(),
                password: joi.string().required()

            })
        },
        handler: userController.changePassword
    },
    {
        method: 'POST',
        path: '/user/update',
        auth: true,
        joiSchemaForSwaggers: {
            group: 'user',
            description: 'forgot password',
            model: 'Forgot Password',
            body: joi.object({
                name: joi.string().required(),

            })
        },
        handler: userController.updateUser
    }
]