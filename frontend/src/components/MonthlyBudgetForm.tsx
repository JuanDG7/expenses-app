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
    <form onSubmit={handleBudgetSubmit}>
      <p>Presupuesto mensual</p>

      <input value={budgetInput} onChange={handleInput} />

      <button type="submit">
        {hasBudget ? "Actualizar presupuesto" : "Crear presupuesto"}
      </button>

      {hasBudget && (
        <button type="button" onClick={handleBudgetDelete}>
          Eliminar presupuesto
        </button>
      )}
    </form>
  );
}
