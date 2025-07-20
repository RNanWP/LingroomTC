console.log("--- INICIANDO SERVIDOR: Verificando Variáveis de Ambiente ---");
console.log(
  `MONGO_URI: ${process.env.MONGO_URI ? "Definida" : "NÃO DEFINIDA"}`
);
console.log(
  `JWT_SECRET: ${process.env.JWT_SECRET ? "Definido" : "NÃO DEFINIDO"}`
);
console.log(`PORT: ${process.env.PORT}`);
console.log("----------------------------------------------------------");

import mongoose from "mongoose";
import { app } from "./app";
import { MONGO_URI, PORT } from "./config";

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB conectado");
      app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
      });
    })
    .catch((err) => console.error("Falha ao conectar ao MongoDB", err));
}

export { app };
