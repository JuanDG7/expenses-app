import type { Expense } from "../types/expense";
interface UseExpenseCalculationsProps {
  expenses: Expense[];
  selectedCategory: string;
  searchTerm: string;
  tagSearch: string;
  sort: string;
  startDate: string;
  endDate: string;
}

export function useExpenseCalculations({
  expenses,
  selectedCategory,
  searchTerm,
  tagSearch,
  sort,
  startDate,
  endDate,
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

  const totalAmount = filteredExpenses.reduce(
    (acc, expense) => acc + (expense.amount || 0),
    0
  );

  const filteredExpensesCount = filteredExpenses.length;

  const amountByCategory = filteredExpenses.reduce((acc, expense) => {
    const category = expense.category || "No tiene categoria";

    acc[category] = (acc[category] || 0) + (expense.amount || 0);

    return acc;
  }, {} as Record<string, number>);

  const countByCategory = filteredExpenses.reduce((acc, expense) => {
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
    totalAmount,
    countByCategory,
    uniqueTags,
    sortedExpenses,
    amountByCategory,
  };
}
