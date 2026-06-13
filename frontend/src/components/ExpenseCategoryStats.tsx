interface ExpenseCategoryStatsProps {
  amountByCategory: Record<string, number>;
  totalAmount: number;
}

export function ExpenseCategoryStats({
  amountByCategory,
  totalAmount,
}: ExpenseCategoryStatsProps) {
  return (
    <div>
      <h2>Gastos por categoría</h2>

      {Object.entries(amountByCategory)
        .sort((a, b) => b[1] - a[1])
        .map(([category, amount]) => {
          const percentage = (amount / totalAmount) * 100;
          return (
            <p key={category}>
              {category}: Gs. {amount} ({percentage.toFixed(1)}%)
            </p>
          );
        })}
    </div>
  );
}
