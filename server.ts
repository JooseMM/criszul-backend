import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sendEmail from "./src/services/emailService.ts";

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", async (req, res) => {
  await sendEmail(req.body)
    .then((ok) => {
      console.log("exito: " + ok);
    })
    .catch((err) => {
      console.log("error: " + err);
    });
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
