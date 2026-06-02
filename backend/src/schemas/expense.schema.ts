import { z } from "zod";
// prettier-ignore

const CATEGORIES = [
  "Comida",
  "Salud",
  "Trabajo",
  "Educación",
  "Hogar",
  "Ocio",
  "Transporte",
  "Otros",
] as const;

export const createExpenseSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(50, "Max 50 characters"),

    amount: z.coerce.number().positive("Amount must be > 0").optional(),

    category: z.enum(CATEGORIES).optional(),

    tags: z.array(z.string().min(1).max(100)).optional(),

    date: z.coerce.date().optional(), // porque en DB tiene DEFAULT
  })
  .strict();

export const updateExpenseSchema = createExpenseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
    path: ["body"], // 👈 clave
  });

export const expenseIdParamSchema = z
  .object({
    id: z.coerce.number().int().positive("Invalid expense id"),
  })
  .strict();
