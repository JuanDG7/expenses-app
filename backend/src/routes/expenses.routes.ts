import { Router } from "express";
import { getExpenses } from "../controllers/expenses.controller";
import { createExpense } from "../controllers/expenses.controller";
import { getExpenseById } from "../controllers/expenses.controller";
import { updateExpense } from "../controllers/expenses.controller";
import { deleteExpense } from "../controllers/expenses.controller";

const router = Router();

router.get("/expenses", getExpenses);
router.post("/expenses", createExpense);
router.get("/expenses/:id", getExpenseById);
router.put("/expenses/:id", updateExpense);
router.delete("/expenses/:id", deleteExpense);

export default router;
