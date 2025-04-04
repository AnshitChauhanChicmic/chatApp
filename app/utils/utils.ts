import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";

const utils = {
    // Hash password (async)
    hashPass: async (pass: string): Promise<string> => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(pass, salt);
    },

    // Compare password (async)
    checkPass: async (pass: string, hashPass: string): Promise<boolean> => {
        return await bcrypt.compare(pass, hashPass);
    },

    // Generate JWT token (async)
    // generateToken: async (id: string | object | Buffer): Promise<string> => {
    //     return await jwt.sign({ id }, config.TOKEN_KEY, { expiresIn: "1h" });
    // },

    // // Verify JWT token (async)
    // verify: async (token: string): Promise<jwt.JwtPayload | string> => {
    //     return new Promise((resolve, reject) => {
    //         jwt.verify(token, config.TOKEN_KEY, (err, decoded) => {
    //             if (err) {
    //                 return reject(new Error(err.message));
    //             }
    //             resolve(decoded as jwt.JwtPayload);
    //         });
    //     });
    // }
};

export default utils;
