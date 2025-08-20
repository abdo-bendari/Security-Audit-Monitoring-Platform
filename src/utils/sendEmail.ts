import dotenv  from 'dotenv';
import nodemailer, { TransportOptions } from "nodemailer";
dotenv.config();
interface EmailOptions {
  from?: string;
  to: string;
  subject?: string;
  text: string;
}

const sendEmail = async ({
  from = '"Security Platform" <abdobeendari@gmail.com>',
  to,
  subject = "Confirmation",
  text,
}: EmailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  } as TransportOptions);

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
  });
};

export default sendEmail;
