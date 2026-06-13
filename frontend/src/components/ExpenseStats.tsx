import { formatGuarani } from "../utils/formatGuarani";

interface ExpenseStatsProps {
  filteredExpensesCount: number;
  totalAmount: number;
}

export function ExpenseStats({
  filteredExpensesCount,
  totalAmount,
}: ExpenseStatsProps) {
  return (
    <>
      <p>Gasto Total: {formatGuarani(totalAmount)}</p>
      <p>Resultados: {filteredExpensesCount}</p>
    </>
  );
}
