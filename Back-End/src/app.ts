import express from "express";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);

export { app };
