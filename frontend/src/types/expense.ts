export type TransactionType = "expense" | "income";
export interface Expense {
  id: number;
  title: string;
  amount: number | null;
  category: string | null;
  tags: string[];
  date: string;
  created_at: string;
  updated_at: string;
  type: TransactionType;
}

export interface CreateExpense {
  title: string;
  amount?: number;
  category?: string;
  tags?: string[];
  date?: string;
  type?: TransactionType;
}

export interface UpdateExpense {
  title?: string;
  amount?: number;
  category?: string;
  tags?: string[];
  date?: string;
  type?: TransactionType;
}
