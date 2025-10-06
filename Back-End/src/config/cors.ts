import type { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: ["http://localhost:3001"], // origem do Front
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
