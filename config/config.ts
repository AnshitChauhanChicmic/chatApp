import dotenv from "dotenv";
dotenv.config();

export const config = {
    PORT: process.env.PORT || 5000,
    DB_URI: process.env.DB_URI || 'mongodb://127.0.0.1:27017/chat-Application',
    TOKEN_KEY: process.env.TOKEN_KEY || '@@@@'
};