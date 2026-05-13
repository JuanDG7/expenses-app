import type { Expense } from "../types/expense";

interface ExpenseCardProps {
  expense: Expense;
  onDelete: (id: number) => void;
  onEdit: (expense: Expense) => void;
}

export function ExpenseCard({ expense, onDelete, onEdit }: ExpenseCardProps) {
  return (
    <div className="rounded-xl border p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{expense.title}</h2>
        <p className="text-sm text-gray-500">{expense.category}</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">${expense.amount}</p>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(expense)}
            className="rounded-lg border px-3 py-2"
          >
            Editar
          </button>

          <button
            onClick={() => onDelete(expense.id)}
            className="rounded-lg bg-black px-3 py-2 text-white"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
