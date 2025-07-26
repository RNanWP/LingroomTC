import express from "express";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import commentRoutes from "./routes/commentRoutes";
import adminRoutes from "./routes/adminRoutes";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swaggerDef.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/users", userRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);

app.use("/api/admin", adminRoutes);

export { app };
