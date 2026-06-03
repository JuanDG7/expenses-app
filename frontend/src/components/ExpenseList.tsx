import type { Expense } from "../types/expense";
import { ExpenseCard } from "./ExpenseCard";
interface ExpenseListProps {
  filteredExpenses: Expense[];
  handleDelete: (id: number) => void;
  handleStartEdit: (expense: Expense) => void;
}

export function ExpenseList({
  filteredExpenses,
  handleDelete,
  handleStartEdit,
}: ExpenseListProps) {
  return (
    <div className="flex-1">
      {" "}
      <h2 className="mb-4 text-xl font-semibold">Gastos</h2>
      {filteredExpenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          onDelete={handleDelete}
          onEdit={handleStartEdit}
        />
      ))}
    </div>
  );
}
