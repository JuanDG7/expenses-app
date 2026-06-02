import { useEffect, useState } from "react";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "./api/expensesApi";
import { ExpenseCard } from "./components/ExpenseCard";
import type { CreateExpense, Expense, UpdateExpense } from "./types/expense";

const CATEGORIES = [
  "Comida",
  "Salud",
  "Trabajo",
  "Educación",
  "Hogar",
  "Ocio",
  "Transporte",
  "Otros",
];

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

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

  function handleAddTag() {
    const newTag = tagsInput.trim().toLowerCase();
    if (!newTag) return;
    if (tags.includes(newTag)) return;

    setTags((prevTags) => [newTag, ...prevTags]);
    setTagsInput("");
  }

  function handleRemoveTag(tagToRemove: string) {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  }

  async function handleCreate() {
    const expenseData: CreateExpense = {
      title,
    };

    if (amount) {
      expenseData.amount = Number(amount);
    }

    if (category) {
      expenseData.category = category;
    }
    if (tags.length > 0) {
      expenseData.tags = tags;
    }

    const newExpense = await createExpense(expenseData);

    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
  }

  async function handleUpdate() {
    if (!editingId) return;
    const updateData: UpdateExpense = {};

    if (title) {
      updateData.title = title;
    }

    if (amount) {
      updateData.amount = Number(amount);
    }
    if (category) {
      updateData.category = category;
    }

    if (tags.length > 0) {
      updateData.tags = tags;
    }

    const updatedExpense = await updateExpense(editingId, updateData);

    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === editingId ? updatedExpense : expense
      )
    );

    setEditingId(null);
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (editingId) {
        await handleUpdate();
      } else {
        await handleCreate();
      }

      setTitle("");
      setAmount("");
      setCategory("");
      setTags([]);
      setTagsInput("");
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
    setAmount(expense.amount ? String(expense.amount) : "");
    setCategory(expense.category || "");
    setTags(expense.tags);
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

        <div>
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              onClick={() => {
                setCategory(cat);
              }}
              className={`rounded-lg border p-3 $ ${
                category === cat ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {" "}
          <input
            type="text"
            value={tagsInput}
            placeholder="Tags"
            onChange={(e) => setTagsInput(e.target.value)}
          />
          <button
            type="button"
            className="rounded-lg border p-3"
            onClick={handleAddTag}
          >
            Agregar Tag
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => handleRemoveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

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
