import type {
  MonthlyBudget,
  CreateMonthlyBudget,
  UpdateMonthlyBudget,
} from "../types/monthlyBudget";
import { api } from "./api";
export async function getMonthlyBudget(
  month: string
): Promise<MonthlyBudget | null> {
  const response = await api.get<MonthlyBudget | null>(
    `/monthly-budgets/${month}`
  );
  return response.data;
}

export async function createMonthlyBudget(
  budget: CreateMonthlyBudget
): Promise<MonthlyBudget> {
  const response = await api.post<MonthlyBudget>("/monthly-budgets", budget);
  return response.data;
}

export async function updateMonthlyBudget(
  month: string,
  budget: UpdateMonthlyBudget
): Promise<MonthlyBudget> {
  const response = await api.patch<MonthlyBudget>(
    `/monthly-budgets/${month}`,
    budget
  );

  return response.data;
}
