export const serverStartup = async (app: any) => {
    app.use(require('express').json());
    app.use(require('cors')());
    app.get('/', (req: any, res: any) => {
        return res.send('hi')
    })
}