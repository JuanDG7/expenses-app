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
import { ExpenseStats } from "./components/ExpenseStats";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("Mas recientes");
  const [tagSearch, setTagSearch] = useState<string>("");
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
    const confirmed = window.confirm(
      "?Estas seguro de que deseas eleminar este gasto?"
    );
    if (!confirmed) return;

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

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      !selectedCategory || expense.category === selectedCategory;

    const matchesSearch =
      !searchTerm ||
      expense.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag =
      !tagSearch ||
      expense.tags.some((tag) =>
        tagSearch
          .split(" ")
          .every((word) => tag.toLowerCase().includes(word.toLowerCase()))
      );

    return matchesCategory && matchesSearch && matchesTag;
  });

  const totalAmount = filteredExpenses.reduce(
    (acc, expense) => acc + (expense.amount || 0),
    0
  );

  const filteredExpensesCount = filteredExpenses.length;

  const sortedExpenses = [...filteredExpenses];

  const uniqueTags = [...new Set(expenses.flatMap((expense) => expense.tags))];

  if (sort === "Monto mayor") {
    sortedExpenses.sort((a, b) => (b.amount || 0) - (a.amount || 0));
  }

  if (sort === "Monto menor") {
    sortedExpenses.sort((a, b) => (a.amount || 0) - (b.amount || 0));
  }

  if (sort === "Mas recientes") {
    sortedExpenses.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  if (sort === "Mas antiguos") {
    sortedExpenses.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  }

  if (sort === "A-Z") {
    sortedExpenses.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sort === "Z-A") {
    sortedExpenses.sort((a, b) => b.title.localeCompare(a.title));
  }

  console.log(sort);
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
          <ExpenseFilters
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sort={sort}
            setSort={setSort}
            tagSearch={tagSearch}
            setTagSearch={setTagSearch}
            uniqueTags={uniqueTags}
          />
        </div>
        <div>
          {" "}
          <ExpenseStats
            filteredExpensesCount={filteredExpensesCount}
            totalAmount={totalAmount}
          />
          <ExpenseList
            filteredExpenses={sortedExpenses}
            handleDelete={handleDelete}
            handleStartEdit={handleStartEdit}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
