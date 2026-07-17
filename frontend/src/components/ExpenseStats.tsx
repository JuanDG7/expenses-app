import { formatGuarani } from "../utils/formatGuarani";

interface ExpenseStatsProps {
  filteredExpensesCount: number;
  totalExpenses: number;
  totalIncome: number;
  balance: number;
}

export function ExpenseStats({
  filteredExpensesCount,
  totalExpenses,
  totalIncome,
  balance,
}: ExpenseStatsProps) {
  return (
    <>
      <>
        <p className="text-[#D8544F]">Gastos: {formatGuarani(totalExpenses)}</p>

        <p className="text-[#007A33]">Ingresos: {formatGuarani(totalIncome)}</p>

        <p>Saldo: {formatGuarani(balance)}</p>

        <p>Resultados: {filteredExpensesCount}</p>
      </>
    </>
  );
}
