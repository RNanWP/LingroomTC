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
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Acesso negado! Token não forncecido" });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = payload;
    return next();
  } catch {
    res.status(401).json({ message: "Token inválido" });
    return;
  }
};

// export const authorize = (roles: string[]): RequestHandler => {
//   return (req, res, next) => {
//     if (!req.user) {
//       res.status(401).json({ message: "Token inválido ou expirado." });
//       return;
//     }

//     if (!roles.includes(req.user.role)) {
//       res.status(403).json({
//         message:
//           "Acesso proibido. Você não tem permissão para executar esta ação.",
//       });
//       return;
//     }
//     next();
//   };
// };

export const authorize = (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    console.log("ROLE no token:", req.user?.role);
    console.log("Roles permitidas:", roles);
    if (!req.user) {
      res
        .status(401)
        .json({ message: "Acesso negado. Faça login para continuar." });
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
