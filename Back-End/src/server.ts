import mongoose from "mongoose";
import { app } from "./app";
import { MONGO_URI, PORT } from "./config";
// import dotenv from "dotenv";
// dotenv.config();

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

// --------------------------------------
// const startServer = async () => {
//   if (!MONGO_URI) {
//     console.error(
//       "ERRO FATAL: A variável de ambiente MONGO_URI não está definida."
//     );
//     process.exit(1);
//   }

//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("MongoDB conectado com sucesso!");

//     app.listen(PORT, () => {
//       console.log(`Servidor rodando na porta ${PORT}`);
//     });
//   } catch (err) {
//     console.error("Falha ao conectar ao MongoDB", err);
//     process.exit(1);
//   }
// };

// startServer();

// export { app };
