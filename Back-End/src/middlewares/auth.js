"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            res.status(401).json({ message: "Acesso negado. Token não fornecido." });
            return;
        }
        if (!config_1.JWT_SECRET) {
            throw new Error("Chave secreta JWT não configurada no servidor.");
        }
        const payload = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token inválido ou expirado." });
    }
});
exports.authenticate = authenticate;
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            res.status(403).json({
                message: "Acesso proibido. Permissão não encontrada no token.",
            });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                message: "Acesso proibido. Você não tem permissão para executar esta ação.",
            });
            return;
        }
        next();
    };
};
exports.authorize = authorize;
// ------------------------------------TESTES-------------------------------
// interface JwtPayload {
//   id: string;
//   email: string;
//   role: string;
// }
// declare global {
//   namespace Express {
//     interface Request {
//       user?: JwtPayload;
//     }
//   }
// }
// export const authenticate: RequestHandler = async (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token) {
//     res.status(401).json({ message: "Acesso negado! Token não forncecido" });
//     return;
//   }
//   try {
//     const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
//     req.user = payload;
//     return next();
//   } catch {
//     res.status(401).json({ message: "Token inválido" });
//     return;
//   }
// };
// ----------------------------------
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
// -----------------------------------
// export const authorize = (...roles: string[]): RequestHandler => {
//   return (req, res, next) => {
//     console.log("ROLE no token:", req.user?.role);
//     console.log("Roles permitidas:", roles);
//     if (!req.user) {
//       res
//         .status(401)
//         .json({ message: "Acesso negado. Faça login para continuar." });
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
