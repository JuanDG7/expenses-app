import axios from "axios";
import type { CreateExpense, Expense, UpdateExpense } from "../types/expense";

type GetExpensesResponse = {
  data: Expense[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export async function getExpenses(): Promise<Expense[]> {
  const response = await api.get<GetExpensesResponse>("/expenses");

  return response.data.data;
}

export async function createExpense(expense: CreateExpense) {
  const response = await api.post("/expenses", expense);

  return response.data;
}

export async function deleteExpense(id: number) {
  await api.delete(`/expenses/${id}`);
}

export async function updateExpense(id: number, expense: UpdateExpense) {
  const response = await api.patch(`/expenses/${id}`, expense);

  return response.data;
}
