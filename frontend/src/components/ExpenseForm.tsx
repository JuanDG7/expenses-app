import { CATEGORIES } from "../constants/categories";
import { formatGuarani } from "../utils/formatGuarani";
import type { TransactionType } from "../types/expense";

export interface ExpenseFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;

  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;

  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;

  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;

  tagsInput: string;
  setTagsInput: React.Dispatch<React.SetStateAction<string>>;

  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleAddTag: () => void;
  handleRemoveTag: (tagToRemove: string) => void;
  editingId: number | null;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  type: TransactionType;
  setType: React.Dispatch<React.SetStateAction<TransactionType>>;
}

export function ExpenseForm({
  title,
  setTitle,
  amount,
  setAmount,
  category,
  setCategory,
  tags,
  setTags,
  tagsInput,
  setTagsInput,
  handleSubmit,
  handleAddTag,
  handleRemoveTag,
  editingId,
  setEditingId,
  type,
  setType,
}: ExpenseFormProps) {
  return (
    <>
      {" "}
      <h2 className=" text-xl font-semibold">Mis Gastos</h2>
      <h3>Registra y controla tus gastos</h3>
      <form
        className="flex flex-col gap-3 rounded-xl border p-6 shadow-sm "
        onSubmit={handleSubmit}
      >
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setType("expense")}
            className={`rounded-lg border p-3 ${
              type === "expense"
                ? "bg-[#D8544F] text-white"
                : "bg-white text-black"
            }`}
          >
            Gasto
          </button>

          <button
            type="button"
            onClick={() => setType("income")}
            className={`rounded-lg border p-3 ${
              type === "income"
                ? "bg-[#007A33] text-white"
                : "bg-white text-black"
            }`}
          >
            Ingreso
          </button>
        </div>
        <input
          className="rounded-lg border p-3"
          type="text"
          placeholder="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="rounded-lg border p-3"
          type="text"
          inputMode="numeric"
          placeholder="Monto"
          value={amount ? formatGuarani(Number(amount)) : ""}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setAmount(value);
          }}
        />

        <div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategory(cat);
              }}
              className={`rounded-lg border p-3  ${
                category === cat ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {" "}
          <input
            type="text"
            value={tagsInput}
            placeholder="Tags"
            onChange={(e) => setTagsInput(e.target.value)}
          />
          <button
            type="button"
            className="rounded-lg border p-3"
            onClick={handleAddTag}
          >
            Agregar Tag
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => handleRemoveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <button className="rounded-lg bg-black p-3 text-white" type="submit">
          {editingId ? "Actualizar gasto" : "Crear gasto"}
        </button>
        {editingId && (
          <button
            className="rounded-lg bg-black p-3 text-white"
            type="button"
            onClick={() => {
              setEditingId(null);
              setTitle("");
              setAmount("");
              setCategory("");
              setTags([]);
              setTagsInput("");
              setType("expense");
            }}
          >
            Cancelar edición
          </button>
        )}
      </form>
    </>
  );
}
