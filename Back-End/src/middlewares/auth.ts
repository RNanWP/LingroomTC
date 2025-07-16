import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate: RequestHandler = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ message: "Acesso negado. Token não fornecido." });
      return;
    }

    if (!JWT_SECRET) {
      throw new Error("Chave secreta JWT não configurada no servidor.");
    }

    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
};

export const authorize = (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      res.status(403).json({
        message: "Acesso proibido. Permissão não encontrada no token.",
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message:
          "Acesso proibido. Você não tem permissão para executar esta ação.",
      });
      return;
    }
    next();
  };
};
