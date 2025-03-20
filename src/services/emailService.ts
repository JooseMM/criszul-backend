import nodemailer from "nodemailer";
import type { Client, Enviroments } from "../models/index.ts";

const enviroment: Enviroments = {
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
};

const transporter = nodemailer.createTransport({
  host: enviroment.EMAIL_HOST,
  port: Number(enviroment.SERVER_PORT),
  secure: false, // true for port 465, false for other ports
  auth: {
    user: enviroment.EMAIL_ADDRESS,
    pass: enviroment.EMAIL_PASS,
  },
});

export default function sendEmail(target: Client): Promise<boolean> {
  // send mail with defined transport object
  return transporter.sendMail({
    from: enviroment.EMAIL_ADDRESS, // sender address
    to: enviroment.EMAIL_ADDRESS, // list of receivers
    subject: "¡Consulta desde tu pagina web!", // Subject line
    html: htmlMessage(target), // html body
  });
}

const htmlMessage = (target: Client) => {
  const greeting = `<h1>Hola! Tienes un mensaje de <b>${target.name.split(" ")[0]}</b></h1>`;
  const info = `<ul><li>Nombre Complet: ${target.name}</li><li>Email: ${target.email}</li><li>Mensaje: ${target.message}</li></ul>`;
  return `<div>${greeting}${info}</div>`;
};
