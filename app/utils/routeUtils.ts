import { Request, Response, NextFunction } from "express";

interface Route {
    path: string;
    method: string;
    auth?: boolean;
    handler: (req: Request, res: Response, next: NextFunction) => void;
}

export const routeUtils = async (app: any, routes: Route[] = []) => {
    routes.forEach((route) => {
        // let middlewares: any[] = [];

        // if (route.auth) {
        //     middlewares.push();
        // }

        app.route(route.path)[route.method.toLowerCase()](getHandlerMethod(route));
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
                    return response.status(result.statusCode).send({message: result.message, data: result.data});
                }
                return response.status(result.statusCode).send(result.message);
            })
            .catch((error: Error) => {
                console.log('Error is ', error.message);
            })
    }
}