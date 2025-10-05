import express from "express";
import postRoutes from "./routes/postRoutes";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import commentRoutes from "./routes/commentRoutes";
import adminRoutes from "./routes/adminRoutes";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swaggerDef.json";
import path from "path";

const app = express();

const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  "https://lingroomtc-egxb.onrender.com",
  "https://seu-site-no-netlify.netlify.app",
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      return allowedOrigins.includes(origin)
        ? cb(null, true)
        : cb(new Error("Não permitido pelo CORS"));
    },
    credentials: true,
  })
);

app.options(
  "*",
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      return allowedOrigins.includes(origin)
        ? cb(null, true)
        : cb(new Error("Não permitido pelo CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use("/api/admin", adminRoutes);

export { app };
