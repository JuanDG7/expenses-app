import { CategoryStatCard } from "./CategoryStatCard";

interface ExpenseCategoryStatsProps {
  amountByCategory: Record<string, number>;
  totalAmount: number;
  countByCategory: Record<string, number>;
}

export function ExpenseCategoryStats({
  amountByCategory,
  totalAmount,
  countByCategory,
}: ExpenseCategoryStatsProps) {
  return (
    <div>
      <h2>Gastos por categoría</h2>

      {Object.entries(amountByCategory)
        .sort((a, b) => b[1] - a[1])
        .map(([category, amount]) => {
          const percentage = (amount / totalAmount) * 100;

          return (
            <CategoryStatCard
              key={category}
              category={category}
              amount={amount}
              percentage={percentage}
              countByCategory={countByCategory[category]}
            />
          );
        })}
    </div>
  );
}
