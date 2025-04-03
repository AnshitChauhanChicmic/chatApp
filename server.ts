import express from 'express';
import { PORT } from './config/config.ts';

const app = express();

app.get('/', (req: express.Request, res: express.Response | any) => {
    return res.send('hi')
})

app.listen(PORT, () => {
    console.log('server running')
})