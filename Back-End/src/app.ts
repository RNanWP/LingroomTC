import express from "express";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import commentRoutes from "./routes/commentRoutes";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./config/swaggerConfig";

const app = express();

app.use(express.json());

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/users", userRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);

export { app };
