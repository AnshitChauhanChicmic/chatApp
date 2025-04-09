import nodemailer from 'nodemailer';

const generateOTP = () => { return (Math.floor(Math.random() * 10000) + 10000).toString().substring(1) };

export const sendOTP = async (userEmail: string) => {

    const transporter = await nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        secure: false,
        auth: {
            user: 'd882faf9107243',
            pass: '4590bec05e37f4'
        },
    });

    const info = await transporter.sendMail({
        from: '"Anshit Chauhan 👻" <anshit@yahoo.in> ',
        to: userEmail,
        subject: "OTP",
        text: "Below is you OTP",
        html: `<b>${generateOTP()}</b>`,
    });
    console.log("Message sent: %s", info.messageId);
}