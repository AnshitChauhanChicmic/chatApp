import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from '../../swagger.json';
import { Routes } from "../routes";
import { routeUtils } from "../utils/routeUtils";

export const serverStartup = async (app: any) => {
    app.use(require('express').json());
    app.use(require('cors')());
    // app.use('/docs', )
    await routeUtils(app, Routes)
    app.get('/', (req: any, res: any) => {
        return res.send('hi')
    })
}