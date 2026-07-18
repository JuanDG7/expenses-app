export interface MonthlyBudget {
  id: number;
  amount: number;
  month: string;
  created_at: string;
  updated_at: string;
}

export interface CreateMonthlyBudget {
  amount: number;
  month: string;
}

export interface UpdateMonthlyBudget {
  amount: number;
}
