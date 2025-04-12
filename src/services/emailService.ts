import nodemailer from "nodemailer";
import type { SentMessageInfo } from "nodemailer";
import type { Client } from "../models/index";
import dotenv from "dotenv";

dotenv.config();
const EMAIL = process.env.EMAIL_ADDRESS;

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // true for port 465, false for other ports
  auth: {
    user: EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export default function sendEmail(target: Client): Promise<SentMessageInfo> {
  // send mail with defined transport object
  return transporter.sendMail({
    from: EMAIL,
    to: EMAIL,
    subject: "¡Mensaje desde tu pagina web!",
    html: htmlMessage(target),
  });
}

const htmlMessage = (target: Client) => {
  const greeting = `<h1>Hola! Tienes un mensaje de <b>${target.name.split(" ")[0]}</b></h1>`;
  const info = `<ul><li>Nombre Completo: ${target.name}</li><li>Email: ${target.email}</li><li>Mensaje: ${target.message}</li></ul>`;
  return `<div>${greeting}${info}</div>`;
};
