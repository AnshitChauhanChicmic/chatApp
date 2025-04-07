import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { config } from "../../config/config";
import mongoose from "mongoose";

const utils = {

    hashPass: async (pass: string): Promise<any> => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(pass, salt);
    },

    checkPass: async (pass: string, hashPass: any): Promise<boolean> => {
        return await bcrypt.compare(pass, hashPass);
    },

    generateToken: async (id: string): Promise<string> => {
        return await jwt.sign({ id: id.toString() }, config.TOKEN_KEY as string, { expiresIn: "24h" });
    },

    verify: async (token: string): Promise<jwt.JwtPayload> => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.TOKEN_KEY as string, (err, decoded) => {
                if (err) {
                    return reject(new Error(err.message));
                }
                resolve(decoded as jwt.JwtPayload);
            });
        });
    }
};

export default utils;