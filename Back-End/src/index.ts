import mongoose from "mongoose";
import express from "express";
import { MONGO_URI, PORT } from "./config";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api", postRoutes);

let server: import("http").Server;

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
      server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => console.error("Failed to connect to MongoDB", err));
}

export { app, server };
