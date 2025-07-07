import mongoose from "mongoose";
import { MONGO_URI, PORT } from "./config";
import express from "express";
import postRoutes from "./routes/postRoutes";

const app = express();

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use("/api", postRoutes);

export { app };
