import express from "express";
import cors from "cors";
import path from "path";

import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import commentRoutes from "./routes/commentRoutes";
import adminRoutes from "./routes/adminRoutes";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swaggerDef.json";

const app = express();

const allowedOrigins = [
  "http://localhost:3001",
  "lingroom-tc.vercel.app",
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Não permitido pela política de CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

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
