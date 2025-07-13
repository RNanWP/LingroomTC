import mongoose from "mongoose";
import { MONGO_URI, PORT } from "./config";
import express from "express";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/users", userRoutes);
app.use("/api", postRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { app };
