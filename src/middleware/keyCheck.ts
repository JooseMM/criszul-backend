import type { NextFunction, Request, Response } from "express";

const ApiKey = {
  key: "secret-key",
};

// get key from enviroment
const key = process.env.SECRET;

export const apiKeyCheck = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const requestKey = req.header(ApiKey.key);

  // check match
  if (!requestKey || !key?.includes(requestKey)) {
    res.status(401).json({ error: "Unauthorized: Invalid or missing API key" });
  } else {
    next();
  }
};
