import { config } from './config/config.ts';
import { serverStartup } from './app/startup/serverStartup.ts';
import { mongooseStartup } from './app/startup/mongooseStartup.ts';
import mongoose from 'mongoose';
import { app, server } from './app/startup/socketStartup.ts'

async function startNodeServer() {
    await mongooseStartup(mongoose);
    await serverStartup(app);
}



startNodeServer().then(() => {
    server.listen(config.PORT, () => {
        console.log(`Server running on port ${config.PORT}`)
    })
}).catch((error) => {
    console.log('Error running server', error.message)
})