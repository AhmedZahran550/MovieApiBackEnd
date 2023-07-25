import { createTransport } from "nodemailer";

const sendEmail = async (email, subject, html) => {
    try {
         const transporter = createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: 587,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });

    const info = await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        html
    });
    return info.accepted.length ? true : false ;
    } catch (error) {
        console.log(error ," error");
    }
   

};

export default sendEmail;