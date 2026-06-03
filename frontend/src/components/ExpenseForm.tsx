import { CATEGORIES } from "../constants/categories";

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
}: ExpenseFormProps) {
  return (
    <>
      {" "}
      <h2 className="mb-4 text-xl font-semibold">Nuevo gasto</h2>
      <form
        className="flex flex-col gap-3 rounded-xl border p-6 shadow-sm "
        onSubmit={handleSubmit}
      >
        <input
          className="rounded-lg border p-3"
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="rounded-lg border p-3"
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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
            }}
          >
            Cancelar edición
          </button>
        )}
      </form>
    </>
  );
}
