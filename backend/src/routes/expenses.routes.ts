import { Router } from "express";
import {
  getExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../controllers/expenses.controller";
import { validate } from "../middlewares/validate";
import {
  createExpenseSchema,
  updateExpenseSchema,
  expenseIdParamSchema,
} from "../schemas/expense.schema";
const router = Router();

router.get("/expenses", getExpenses);
router.get(
  "/expenses/:id",
  validate(expenseIdParamSchema, "params"),
  getExpenseById
);
router.post("/expenses", validate(createExpenseSchema), createExpense);
router.patch(
  "/expenses/:id",
  validate(expenseIdParamSchema, "params"),
  validate(updateExpenseSchema),
  updateExpense
);
router.delete(
  "/expenses/:id",
  validate(expenseIdParamSchema, "params"),
  deleteExpense
);

export default router;
