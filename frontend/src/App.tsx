import { useEffect, useState } from "react";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "./api/expensesApi";

import {
  getMonthlyBudget,
  createMonthlyBudget,
  updateMonthlyBudget,
  deleteMonthlyBudget,
} from "./api/monthlyBudgetsApi";

import type {
  CreateExpense,
  Expense,
  UpdateExpense,
  TransactionType,
} from "./types/expense";
import type { MonthlyBudget } from "./types/monthlyBudget";

import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { ExpenseFilters } from "./components/ExpenseFilters";
import { ExpenseStats } from "./components/ExpenseStats";
import { ExpenseCategoryStats } from "./components/ExpenseCategoryStats";
import { useExpenseCalculations } from "./hooks/useExpenseCalculations";
import { MonthlyBudgetForm } from "./components/MonthlyBudgetForm";

const monthFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
});

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [budget, setBudget] = useState<MonthlyBudget | null>(null);
  const [budgetInput, setBudgetInput] = useState("");
  const currentMonth = `${monthFormatter.format(new Date())}-01`;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("Mas recientes");
  const [tagSearch, setTagSearch] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  useEffect(() => {
    async function loadMonthlyBudget() {
      try {
        const data = await getMonthlyBudget(currentMonth);
        setBudget(data);
        setBudgetInput(data ? String(data.amount) : "");
      } catch (err) {
        console.error(err);
        setError("error al cargar el presupuesto");
      }
    }
    loadMonthlyBudget();
  }, [currentMonth]);

  async function handleBudgetSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!budgetInput.trim()) return;
    try {
      const amount = Number(budgetInput);

      const savedBudget = budget
        ? await updateMonthlyBudget(currentMonth, { amount })
        : await createMonthlyBudget({
            amount,
            month: currentMonth,
          });
      setBudget(savedBudget);
      setBudgetInput(String(savedBudget.amount));
    } catch (err) {
      console.error(err);
      setError("error al guardar el presupuesto");
    }
  }

  async function handleBudgetDelete() {
    if (!budget) return;

    const confirmed = window.confirm("¿Eliminar el presupuesto mensual?");

    if (!confirmed) return;

    try {
      await deleteMonthlyBudget(currentMonth);

      setBudget(null);
      setBudgetInput("");
    } catch (err) {
      console.error(err);
      setError("Error al eliminar el presupuesto");
    }
  }

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
      type,
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
    updateData.type = type;

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
      setType("expense");
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
    setType(expense.type);
  }

  const {
    filteredExpensesCount,
    totalAmount,
    totalExpenses,
    totalIncome,
    balance,
    countByCategory,
    uniqueTags,
    sortedExpenses,
    amountByCategory,
  } = useExpenseCalculations({
    expenses,
    selectedCategory,
    searchTerm,
    tagSearch,
    sort,
    startDate,
    endDate,
  });
  if (loading) return <p>Cargando...</p>;

  if (error) return <p>{error}</p>;

  console.log(sort);
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-1 p-6">
      <MonthlyBudgetForm
        budgetInput={budgetInput}
        setBudgetInput={setBudgetInput}
        handleBudgetSubmit={handleBudgetSubmit}
        handleBudgetDelete={handleBudgetDelete}
        hasBudget={budget !== null}
      />
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
        type={type}
        setType={setType}
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
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </div>
        <div>
          {" "}
          <ExpenseStats
            filteredExpensesCount={filteredExpensesCount}
            totalExpenses={totalExpenses}
            totalIncome={totalIncome}
            balance={balance}
          />
          <ExpenseList
            filteredExpenses={sortedExpenses}
            handleDelete={handleDelete}
            handleStartEdit={handleStartEdit}
          />
          <ExpenseCategoryStats
            amountByCategory={amountByCategory}
            totalAmount={totalAmount}
            countByCategory={countByCategory}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
