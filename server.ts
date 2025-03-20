import express from "express";
import bodyParse from "body-parser";
import cors from "cors";
import sendEmail from "./src/services/emailService.ts";

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(cors());
app.use(bodyParse.json());

app.post("/", async (req, res) => {
  try {
    const result = await sendEmail(req.body);
    res.status(200).json({ successful: result });
  } catch (e) {
    res.status(500).json({ successful: false });
  }
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
