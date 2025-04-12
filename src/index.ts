import express from "express";
import { Request, Response } from "express";
import bodyParse from "body-parser";
import cors from "cors";
import { validationResult } from "express-validator";
import keyCheckMiddleware from "./middleware/keyCheck";
import dotenv from "dotenv";
import sanitizeBody from "./validators/validator";
import sendEmail from "./services/emailService";

dotenv.config();
const app = express();
const PORT = parseInt(process.env.PORT || "8080", 10);

const corsOptions = {
  origin: process.env.ORIGIN,
  methods: process.env.METHOD?.split(","),
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(keyCheckMiddleware);
app.use(bodyParse.json());

app.post("/", sanitizeBody, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ successful: false, errors: errors.array() });
    return;
  }

  try {
    const result = await sendEmail(req.body);
    res.status(200).json({ successful: result });
  } catch (e) {
    res.status(500).json({ successful: false });
  }
});

app.get("/health", (_req, res) => {
  res.status(200).json({ successful: true });
});

app.listen(PORT || 8080, () =>
  console.log(`Server listening on port: ${PORT}`),
);
