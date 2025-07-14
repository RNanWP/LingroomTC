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
exports.registerUserService = registerUserService;
exports.loginUserService = loginUserService;
const User_1 = require("../models/User");
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function registerUserService(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new User_1.User(userData);
        return user.save();
    });
}
// ---------------------------------------
// Registrar usuario
// export async function registerUserService(
//   userData: Omit<IUser, "comparePassword">
// ): Promise<IUser> {
//   const user = new User(userData);
//   return user.save();
// }
// Autenticando usuario
function loginUserService(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ email }).select("+password");
        if (!user || !(yield user.comparePassword(password))) {
            return null;
        }
        const payload = { id: user._id, email: user.email, role: user.role };
        const token = jsonwebtoken_1.default.sign(payload, config_1.JWT_SECRET, { expiresIn: "1h" });
        return { user, token };
    });
}
