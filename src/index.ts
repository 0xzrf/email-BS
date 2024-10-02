import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();


const EMAIL_JOON = process.env.EMAIL_JOON;
const EMAIL_JOON_PASSWORD = process.env.EMAIL_JOON_PASSWORD;
const EMAIL_AMOR = process.env.EMAIL_AMOR;

// Configure CORS
const corsOptions = {
    origin: ['*'],
    methods: ['POST'],
};

app.use(cors(corsOptions));
//@ts-ignore
app.post("/", async (req, res) => {
    const { email, type, message } = req.query;

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_JOON,
            pass: EMAIL_JOON_PASSWORD,
        },
    });

    const mailOptions = {
        from: EMAIL_JOON,
        to: EMAIL_AMOR,
        subject: `${type} from ${email}`,
        text: `${message}`,
    };

    const sendMailPromise = () =>
        new Promise<string>((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
                if (!err) {
                    resolve('Email sent');
                } else {
                    reject(err.message);
                }
            });
        });

    try {
        await sendMailPromise();
        return res.status(200).json({ success: true, message: 'Email sent' });
    } catch (err) {
        return res.status(200).json({ error: err });
    }

});

app.listen(3001, () => {
    console.log("Server is running on port 3000");
});
