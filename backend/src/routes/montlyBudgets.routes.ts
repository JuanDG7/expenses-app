import { Router } from "express";
import {
  getMonthlyBudget,
  createMonthlyBudget,
  updateMonthlyBudget,
} from "../controllers/monthlyBudgets.controller";
import { validate } from "../middlewares/validate";
import {
  createMonthlyBudgetSchema,
  updateMonthlyBudgetSchema,
  monthlyBudgetMonthParamSchema,
} from "../schemas/monthlyBudgetSchemas";

const router = Router();

router.get(
  "/monthly-budgets/:month",
  validate(monthlyBudgetMonthParamSchema, "params"),
  getMonthlyBudget
);

router.post(
  "/monthly-budgets",
  validate(createMonthlyBudgetSchema),
  createMonthlyBudget
);

router.patch(
  "/monthly-budgets/:month",
  validate(monthlyBudgetMonthParamSchema, "params"),
  validate(updateMonthlyBudgetSchema),
  updateMonthlyBudget
);

export default router;
