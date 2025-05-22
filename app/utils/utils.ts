import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import handlebars from 'handlebars';
import { config } from "../../config/config";

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

export const commonFunction = {
    generateOTP: () => {
        const otp: number = Math.floor(Math.random() * 10000);
        return otp;
    },
    generateTemplate: (otp: any, user: any) => {
        var source = "<html>" +
            "<head><title>OTP Verification</title></head>" +
            "<body><p>Hi {{username}}</p>" +
            "<p>Your OTP for {{purpose}} is: <p>" +
            "<div>{{otp}}</div>" +
            "<p>This code is valid for {{expiryMinutes}} minutes.</p>" +
            "<p>If you did not request this, please ignore this email or contact our support team.</p>" +
            "<p>Thanks,<br>{{companyName}}</p></body>" +
            "</html>";
        var template = handlebars.compile(source);
        var data = { username: user.name, purpose: "Forgot Password", otp: otp, expiryMinutes: 2, companyName: "Chicmic Studios" };
        var result = template(data);
        return result;
    },
    sendOTP: async (user: any, otp: any) => {
        try {
            console.log(" Email Received:", user.email);

            if (!user.email) {
                throw new Error("Email not defined");
            }

            const transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 587,
                auth: {
                    user: "d882faf9107243",
                    pass: "4590bec05e37f4"
                },
            });

            const mailOptions = {
                from: '<>',
                to: user.email,
                subject: "Forgot Password Email",
                html: commonFunction.generateTemplate(otp, user)
            };

            await transporter.sendMail(mailOptions);
            console.log(`OTP sent successfully to ${user.email}`);
            return true;
        } catch (error) {
            console.error("Error sending email:", error);
            return false;
        }
    }
}

export default utils;