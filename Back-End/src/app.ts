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

const uploadsDir = path.resolve(__dirname, "../public/uploads");

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "../public/uploads"))
);

app.use("/uploads", (req, _res, next) => {
  console.log("[/uploads] HIT:", req.method, req.path);
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use("/api/admin", adminRoutes);

export { app };
