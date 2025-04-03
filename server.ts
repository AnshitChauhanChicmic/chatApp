import express from 'express';
import { PORT } from './config/config.ts';
import { serverStartup } from './app/startup/serverStartup.ts';

const app = express();

async function startNodeServer() {
    await serverStartup(app);
}

startNodeServer().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}).catch((error) => {
    console.log('Error running server', error.message)
})