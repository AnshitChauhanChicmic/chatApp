import { userController } from "../../controller";

export const userRoutes = [
    {
        method: 'POST',
        path: '/user/signup',
        joiSchemaForSwaggers: {
            group: 'user',
            description: 'register a new user',
            model: 'UserRegister',
            
        },
        handler: userController.userSignup
    },
    {
        method: 'POST',
        path: '/user/login',
        handler: userController.userLogin
    }
]