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

const allowedOrigins = [
  "http://localhost:3001",
  // Adicione aqui o URL do seu front-end da Vercel quando o tiver
  // Ex: 'https://seu-projeto-frontend.vercel.app'
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "A política de CORS para este site não permite acesso a partir da origem especificada.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static(path.join(__dirname, "../public")));

// Rotas da API
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
