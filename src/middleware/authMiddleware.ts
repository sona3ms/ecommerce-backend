import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authentication token is missing",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Invalid authorization header",
    });
  }

  try {
    const decoded = verifyToken(token);

    console.log(decoded);

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};