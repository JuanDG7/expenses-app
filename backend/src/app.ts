import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import type { Request, Response, NextFunction } from "express";
import expensesRoutes from "./routes/expenses.routes";
import monthlyBudgetRoutes from "./routes/montlyBudgets.routes";
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

app.use("/api", expensesRoutes);
app.use("/api", monthlyBudgetRoutes);

// GLOBAL ERROR MIDDLEWARE
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err.name === "ZodError") {
    return res.status(422).json({
      message: "Error de validacion",
      data: err.issues,
    });
  }

  res.status(500).json({
    message: "Internal server error",
  });
});

export default app;
