import type { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
// get key from enviroment
const key = process.env.SECRET;

const keyCheckMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const requestKey = req.header(process.env.KEY_NAME!);

  // check match
  if (!requestKey || !key?.includes(requestKey)) {
    res.status(401).json({ error: "Unauthorized: Invalid or missing API key" });
  } else {
    next();
  }
};

export default keyCheckMiddleware;
