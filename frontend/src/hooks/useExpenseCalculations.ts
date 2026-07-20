import type { Expense } from "../types/expense";
interface UseExpenseCalculationsProps {
  expenses: Expense[];
  selectedCategory: string;
  searchTerm: string;
  tagSearch: string;
  sort: string;
  startDate: string;
  endDate: string;
  currentMonth: string;
}

export function useExpenseCalculations({
  expenses,
  selectedCategory,
  searchTerm,
  tagSearch,
  sort,
  startDate,
  endDate,
  currentMonth,
}: UseExpenseCalculationsProps) {
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
    const expenseDate = new Intl.DateTimeFormat("en-CA").format(
      new Date(expense.date)
    );

    const matchesDate =
      (!startDate || expenseDate >= startDate) &&
      (!endDate || expenseDate <= endDate);

    return matchesCategory && matchesSearch && matchesTag && matchesDate;
  });

  const monthlyExpenses = expenses.filter((expense) => {
    const expenseMonth = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
    }).format(new Date(expense.date));

    return expenseMonth === currentMonth.slice(0, 7);
  });

  const monthlyTotalExpenses = monthlyExpenses
    .filter((expense) => expense.type === "expense")
    .reduce((acc, expense) => acc + (expense.amount || 0), 0);

  const monthlyTotalIncome = monthlyExpenses
    .filter((expense) => expense.type === "income")
    .reduce((acc, expense) => acc + (expense.amount || 0), 0);

  const monthlyBalance = monthlyTotalIncome - monthlyTotalExpenses;

  const totalExpenses = filteredExpenses
    .filter((expense) => expense.type === "expense")
    .reduce((acc, expense) => acc + (expense.amount || 0), 0);

  const totalIncome = filteredExpenses
    .filter((expense) => expense.type === "income")
    .reduce((acc, expense) => acc + (expense.amount || 0), 0);
  const balance = totalIncome - totalExpenses;

  const filteredExpensesCount = filteredExpenses.length;

  const amountByCategory = filteredExpenses
    .filter((expense) => expense.type === "expense")
    .reduce((acc, expense) => {
      const category = expense.category || "No tiene categoria";

      acc[category] = (acc[category] || 0) + (expense.amount || 0);

      return acc;
    }, {} as Record<string, number>);

  const countByCategory = filteredExpenses
    .filter((expense) => expense.type === "expense")
    .reduce((acc, expense) => {
      const category = expense.category || "Categoria no existe";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

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

  return {
    filteredExpensesCount,
    totalAmount: totalExpenses,
    totalExpenses,
    totalIncome,
    balance,
    monthlyTotalExpenses,
    monthlyTotalIncome,
    monthlyBalance,
    countByCategory,
    uniqueTags,
    sortedExpenses,
    amountByCategory,
  };
}
