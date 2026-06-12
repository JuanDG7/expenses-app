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
      {" "}
      <p> Gasto Total: Gs. {totalAmount}</p>
      <p>Resultados: {filteredExpensesCount}</p>
    </>
  );
}
