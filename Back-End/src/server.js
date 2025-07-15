"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const config_1 = require("./config");
if (process.env.NODE_ENV !== "test") {
    mongoose_1.default
        .connect(config_1.MONGO_URI)
        .then(() => {
        console.log("MongoDB conectado");
        app_1.app.listen(config_1.PORT, () => {
            console.log(`Servidor rodando na porta ${config_1.PORT}`);
        });
    })
        .catch((err) => console.error("Falha ao conectar ao MongoDB", err));
}
