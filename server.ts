import express from 'express';
import { config } from './config/config.ts';
import { serverStartup } from './app/startup/serverStartup.ts';
import { mongooseStartup } from './app/startup/mongooseStartup.ts';
import mongoose from 'mongoose';

const app = express();

async function startNodeServer() {
    await mongooseStartup(mongoose);
    await serverStartup(app);
}

startNodeServer().then(() => {
    app.listen(config.PORT, () => {
        console.log(`Server running on port ${config.PORT}`)
    })
}).catch((error) => {
    console.log('Error running server', error.message)
})