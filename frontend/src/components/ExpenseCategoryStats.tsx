interface ExpenseCategoryStatsProps {
  amountByCategory: Record<string, number>;
}

export function ExpenseCategoryStats({
  amountByCategory,
}: ExpenseCategoryStatsProps) {
  return (
    <div>
      <h2>Gastos por categoría</h2>

      {Object.entries(amountByCategory).map(([category, amount]) => (
        <p key={category}>
          {category}: Gs. {amount}
        </p>
      ))}
    </div>
  );
}
