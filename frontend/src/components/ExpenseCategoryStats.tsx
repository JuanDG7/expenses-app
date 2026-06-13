interface ExpenseCategoryStatsProps {
  amountByCategory: Record<string, number>;
}

export function ExpenseCategoryStats({
  amountByCategory,
}: ExpenseCategoryStatsProps) {
  return (
    <div>
      <h2>Gastos por categoría</h2>

      {Object.entries(amountByCategory)
        .sort((a, b) => b[1] - a[1])
        .map(([category, amount]) => (
          <p key={category}>
            {category}: Gs. {amount}
          </p>
        ))}
    </div>
  );
}
