import { formatGuarani } from "../utils/formatGuarani";

interface CategoryStatCardProps {
  category: string;
  amount: number;
  percentage: number;
  countByCategory: number;
}

export function CategoryStatCard({
  category,
  amount,
  percentage,
  countByCategory,
}: CategoryStatCardProps) {
  return (
    <>
      {" "}
      <div className="mb-4">
        <p>
          {category}: {formatGuarani(amount)} ({percentage.toFixed(1)}%) -{" "}
          {countByCategory} gastos
        </p>
        <div className="h-6 w-full rounded bg-gray-200">
          <div
            className="h-6 rounded bg-black"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>
    </>
  );
}
