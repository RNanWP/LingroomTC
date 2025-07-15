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
