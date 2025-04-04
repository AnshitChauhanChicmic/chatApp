import { config } from '../../config/config';

export const mongooseStartup = async (mongoose: any) => {
    await mongoose.connect(config.DB_URI)
        .then(() => {
            console.log(`Connected to database`);
        })
        .catch((error: any) => {
            console.log(`Error connecting to database`, error.message);
        })
}