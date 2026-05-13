import { useEffect, useState } from "react";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "./api/expensesApi";
import { ExpenseCard } from "./components/ExpenseCard";
import type { Expense } from "./types/expense";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar gastos");
      } finally {
        setLoading(false);
      }
    }

    loadExpenses();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (editingId) {
        const updatedExpense = await updateExpense(editingId, {
          title,
          amount: Number(amount),
          category,
        });

        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === editingId ? updatedExpense : expense
          )
        );

        setEditingId(null);
      } else {
        const newExpense = await createExpense({
          title,
          amount: Number(amount),
          category,
        });

        setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
      }

      setTitle("");
      setAmount("");
      setCategory("");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteExpense(id);

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  }

  function handleStartEdit(expense: Expense) {
    setEditingId(expense.id);
    setTitle(expense.title);
    setAmount(String(expense.amount));
    setCategory(expense.category);
  }

  if (loading) return <p>Cargando...</p>;

  if (error) return <p>{error}</p>;

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 p-6">
      <h1>Gestión de gastos</h1>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className="rounded-lg border p-3"
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="rounded-lg border p-3"
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="rounded-lg border p-3"
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button className="rounded-lg bg-black p-3 text-white" type="submit">
          {editingId ? "Actualizar gasto" : "Crear gasto"}
        </button>
        {editingId && (
          <button
            className="rounded-lg bg-black p-3 text-white"
            type="button"
            onClick={() => {
              setEditingId(null);
              setTitle("");
              setAmount("");
              setCategory("");
            }}
          >
            Cancelar edición
          </button>
        )}
      </form>

      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          onDelete={handleDelete}
          onEdit={handleStartEdit}
        />
      ))}
    </main>
  );
}

export default App;
