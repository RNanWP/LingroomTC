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

app.use(
  cors({
    origin: ["http://localhost:3000", ""],
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
