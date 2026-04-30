import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import type { Request, Response, NextFunction } from "express";

dotenv.config();

const app = express();

// CORS
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// PARSE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PUBLIC
app.use("/images", express.static(path.join(__dirname, "..", "images")));

// TEST ROUTE
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// GLOBAL ERROR MIDDLEWARE
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = error.statusCode || 500;
  const message = error.message || "Internal server error";
  const data = error.data;

  res.status(status).json({ message, data });
});

export default app;
