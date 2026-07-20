interface MonthlyBudgetFormProps {
  budgetInput: string;
  setBudgetInput: React.Dispatch<React.SetStateAction<string>>;
  handleBudgetSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  hasBudget: boolean;
  handleBudgetDelete: () => Promise<void>;
}

export function MonthlyBudgetForm({
  budgetInput,
  setBudgetInput,
  handleBudgetSubmit,
  hasBudget,
  handleBudgetDelete,
}: MonthlyBudgetFormProps) {
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setBudgetInput(e.target.value);
  }
  return (
    <form onSubmit={handleBudgetSubmit} className="border p-5">
      <p>Presupuesto mensual</p>

      <input value={budgetInput} onChange={handleInput} />
      <div className="flex gap-5">
        <button type="submit" className="border">
          {hasBudget ? "Actualizar presupuesto" : "Crear presupuesto"}
        </button>

        {hasBudget && (
          <button type="button" onClick={handleBudgetDelete} className="border">
            Eliminar presupuesto
          </button>
        )}
      </div>
    </form>
  );
}
