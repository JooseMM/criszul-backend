import nodemailer from "nodemailer";
import { Client } from "./ ";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function sendEmail(target: Client) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.EMAIL_ADDRESS, // sender address
    to: process.env.EMAIL_ADDRESS, // list of receivers
    subject: "¡Consulta desde tu pagina web!", // Subject line
    html: htmlMessage(target), // html body
  });
  console.log("Message sent: %s", info.messageId);
}

const htmlMessage = (target: Client) => {
  const greeting = `<h1>Hola! Tienes un mensaje de: <b>${target.name}</b></h1>`;
  const info = `<ul><li>Email: ${target.email}</li><li>Mensaje: ${target.message}</li></ul>`;
  return `<div>${greeting}${info}</div>`;
};
