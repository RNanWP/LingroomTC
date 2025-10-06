import express from "express";
import cors, { CorsOptions } from "cors";
import path from "path";
import "dotenv/config"; // ou o dotenv.config(...) acima

import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import commentRoutes from "./routes/commentRoutes";
import adminRoutes from "./routes/adminRoutes";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swaggerDef.json";

const app = express();

// --- CORS manual, ANTES de tudo ---
const allowedOrigins = ["http://localhost:3001"]; // front local
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Vary", "Origin");
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // responde preflight corretamente
  }
  next();
});

// se você ainda quiser servir arquivos estáticos:
// app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());

// logs (ok deixar)
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// suas rotas
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);

export { app };

// import express from "express";
// import postRoutes from "./routes/postRoutes";
// import cors from "cors";
// import userRoutes from "./routes/userRoutes";
// import commentRoutes from "./routes/commentRoutes";
// import adminRoutes from "./routes/adminRoutes";

// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./config/swaggerDef.json";
// import path from "path";

// const app = express();

// const corsOptions = {
//   origin: ["http://localhost:3001"], // exatamente a origem do seu front
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors());
// app.options("*", cors({ origin: true, credentials: true }));
// app.use(express.json());

// app.use((req, _res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
//   next();
// });

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// // app.use(express.static(path.join(__dirname, "../public")));
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/comments", commentRoutes);

// app.use("/api/admin", adminRoutes);

// export { app };
