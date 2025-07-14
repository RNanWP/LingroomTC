"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const userService = __importStar(require("../services/userServices"));
// registro
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, role } = req.body;
            const user = yield userService.registerUserService({
                name,
                email,
                password,
                role,
            });
            // const user = await userService.registerUserService(req.body);
            // remove a senha por segurança
            const userResponse = user.toObject();
            delete userResponse.password;
            res
                .status(201)
                .json({ message: "Usuário criado com sucesso!", user: userResponse });
        }
        catch (error) {
            // tratar email duplicado
            if (error.code === 11000) {
                return res.status(409).json({ message: "Este email já está em uso." });
            }
            res
                .status(500)
                .json({ message: "Erro ao registrar usuário", error: error.message });
        }
    });
}
// login
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const result = yield userService.loginUserService(email, password);
            if (!result) {
                return res.status(401).json({ message: "Email ou senha inválidos." });
            }
            const { user, token } = result;
            // remove a senha por segurança
            const userResponse = user.toObject();
            delete userResponse.password;
            res
                .status(200)
                .json({ message: "Login bem-sucedido!", user: userResponse, token });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Erro ao fazer login", error: error.message });
        }
    });
}
