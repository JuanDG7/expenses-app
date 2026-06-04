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
      <div className="mb-4 flex justify-between text-xl ">
        {" "}
        <h2 className="font-semibold">Gastos</h2>
        <h2>Resultados: {filteredExpenses.length}</h2>
      </div>
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
