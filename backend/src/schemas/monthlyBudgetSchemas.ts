import { z } from "zod";

export const createMonthlyBudgetSchema = z
  .object({
    amount: z.coerce.number().min(0, "Amount must be 0 or greater"),

    month: z
      .string()
      .regex(/^\d{4}-\d{2}-01$/, "Month must use the format YYYY-MM-01"),
  })
  .strict();

export const updateMonthlyBudgetSchema = z
  .object({
    amount: z.coerce.number().min(0, "Amount must be 0 or greater"),
  })
  .strict();

export const monthlyBudgetMonthParamSchema = z
  .object({
    month: z.string().regex(/^\d{4}-\d{2}-01$/, "Month must use YYYY-MM-01"),
  })
  .strict();
