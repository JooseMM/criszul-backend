import express from "express";
import type { Request, Response } from "express";
import bodyParse from "body-parser";
import cors from "cors";
import sendEmail from "./src/services/emailService.ts";
import sanitizeBody from "./src/validators/validator.ts";
import { validationResult } from "express-validator";
import { keyCheckMiddleware } from "./src/middleware/keyCheck.ts";

const app = express();
const PORT = process.env.SERVER_PORT;

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

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
