import nodemailer from "nodemailer";
import type { Client, Enviroments } from "../models/index.ts";

const emailInfo: Enviroments = {
  host: process.env.EMAIL_HOST,
  password: process.env.EMAIL_PASS,
  port: process.env.EMAIL_PORT,
  email: process.env.EMAIL_ADDRESS,
};

const transporter = nodemailer.createTransport({
  host: emailInfo.host,
  port: Number(emailInfo.SERVER_PORT),
  secure: false, // true for port 465, false for other ports
  auth: {
    user: emailInfo.email,
    pass: emailInfo.password,
  },
});

export default function sendEmail(target: Client): Promise<boolean> {
  // send mail with defined transport object
  return transporter.sendMail({
    from: emailInfo.email, // sender address
    to: emailInfo.email, // list of receivers
    subject: "¡Consulta desde tu pagina web!", // Subject line
    html: htmlMessage(target), // html body
  });
}

const htmlMessage = (target: Client) => {
  const greeting = `<h1>Hola! Tienes un mensaje de <b>${target.name.split(" ")[0]}</b></h1>`;
  const info = `<ul><li>Nombre Complet: ${target.name}</li><li>Email: ${target.email}</li><li>Mensaje: ${target.message}</li></ul>`;
  return `<div>${greeting}${info}</div>`;
};
