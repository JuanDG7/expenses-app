import { formatGuarani } from "../utils/formatGuarani";

interface ExpenseStatsProps {
  filteredExpensesCount: number;
  totalExpenses: number;
  totalIncome: number;
  monthlyBudget: number;
  availableBalance: number;
}

export function ExpenseStats({
  filteredExpensesCount,
  totalExpenses,
  totalIncome,
  monthlyBudget,
  availableBalance,
}: ExpenseStatsProps) {
  return (
    <>
      {" "}
      <p>Saldo disponible: {formatGuarani(availableBalance)}</p>
      <p>Presupuesto mensual: {formatGuarani(monthlyBudget)}</p>
      <p className="text-[#007A33]">Ingresos: {formatGuarani(totalIncome)}</p>
      <p className="text-[#D8544F]">Gastos: {formatGuarani(totalExpenses)}</p>
      <p>Resultados: {filteredExpensesCount}</p>
    </>
  );
}
