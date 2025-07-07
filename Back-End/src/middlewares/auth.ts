import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const authenticate: RequestHandler = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Token missing" });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    (req as any).user = payload;
    return next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};
