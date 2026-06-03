import { useEffect, useState } from "react";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "./api/expensesApi";

import type { CreateExpense, Expense, UpdateExpense } from "./types/expense";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { ExpenseFilters } from "./components/ExpenseFilters";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 p-6">
      <ExpenseForm
        title={title}
        setTitle={setTitle}
        amount={amount}
        setAmount={setAmount}
        category={category}
        setCategory={setCategory}
        tags={tags}
        setTags={setTags}
        tagsInput={tagsInput}
        setTagsInput={setTagsInput}
        handleSubmit={handleSubmit}
        handleAddTag={handleAddTag}
        editingId={editingId}
        setEditingId={setEditingId}
        handleRemoveTag={handleRemoveTag}
      />

      <div className="flex gap-6">
        {" "}
        <div className="w-64">
          {" "}
          <ExpenseFilters
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <ExpenseList
          filteredExpenses={filteredExpenses}
          handleDelete={handleDelete}
          handleStartEdit={handleStartEdit}
        />
      </div>
    </main>
  );
}

export default App;
