import { userRoutes } from "../routes/v1/userRoutes";
import { routeUtils } from "../utils/routeUtils";

export const serverStartup = async (app: any) => {
    app.use(require('express').json());
    app.use(require('cors')());
    await routeUtils(app, userRoutes);
    app.get('/', (req: any, res: any) => {
        return res.send('hi')
    })
}