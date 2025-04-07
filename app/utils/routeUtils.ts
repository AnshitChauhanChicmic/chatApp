import { Request, Response } from "express";
import { authService } from "../service/authService";
import multer from 'multer';
import { schemaValidation } from "../service/schemaValidation";

interface Route {
    path: string;
    method: string;
    joiSchemaForSwaggers?: object;
    auth?: boolean;
    uploadFile?: File;
    handler: (payload: object) => object
}

const storage = multer.diskStorage({
    destination: (request: Request, file, cb) => {
        cb(null, './public');
    },
    filename: (request: Request, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const uploadMiddleware = multer({ storage });

export const routeUtils = async (app: any, routes: Route[] = []) => {
    routes.forEach((route) => {
        let middlewares: any[] = [];

        if (route.joiSchemaForSwaggers) {
            middlewares.push(schemaValidation(route.joiSchemaForSwaggers))
        }

        if (route.auth) {
            middlewares.push(authService);
        }

        if (route.uploadFile) {
            middlewares.push(uploadMiddleware)
        }

        app.route(route.path)[route.method.toLowerCase()](...middlewares, getHandlerMethod(route));
    });
};

let getHandlerMethod = (route: any) => {
    const { handler } = route;
    return (request: Request | any, response: Response) => {
        let payload = {
            ...(request.body || {}),
            ...(request.params || {}),
            ...(request.query || {}),
            file: (request.file || {}),
            user: (request.user ? request.user : {}),
        }
        handler(payload)
            .then((result: any) => {
                if (result.data) {
                    return response.status(result.statusCode).send({ message: result.message, data: result.data });
                }
                return response.status(result.statusCode).send(result.message);
            })
            .catch((error: Error) => {
                console.log('Error is ', error.message);
            })
    }
}

