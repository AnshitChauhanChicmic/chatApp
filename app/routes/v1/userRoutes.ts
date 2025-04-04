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
        // handler: userControler.userSignup
        handler: userController.userSignup
    },
]