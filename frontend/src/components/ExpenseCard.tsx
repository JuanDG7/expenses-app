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
        <div className="mt-2 flex flex-wrap gap-2">
          {expense.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
            >
              #{tag}
            </span>
          ))}
        </div>
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
