import { CATEGORIES } from "../constants/categories";
import { SORT_OPTIONS } from "../constants/sortOptions";

interface ExpenseFiltersProps {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  tagSearch: string;
  setTagSearch: React.Dispatch<React.SetStateAction<string>>;
  uniqueTags: string[];
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

export function ExpenseFilters({
  setSelectedCategory,
  selectedCategory,
  searchTerm,
  setSearchTerm,
  sort,
  setSort,
  tagSearch,
  setTagSearch,
  uniqueTags,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: ExpenseFiltersProps) {
  return (
    <>
      <h2 className="mb-4 text-xl font-semibold">Filtros</h2>

      <div className="rounded-xl border p-4 shadow-sm">
        <div className="flex">
          <input
            className="mb-4 w-full rounded-lg border border-gray-300 bg-gray-50 p-3"
            type="text"
            placeholder="🔍 Buscar gasto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <input
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 mb-3"
          type="text"
          placeholder="🏷️ Buscar tag..."
          value={tagSearch}
          onChange={(e) => setTagSearch(e.target.value)}
        />
        <div className="my-5 flex flex-wrap gap-2">
          {uniqueTags.map((tag) => (
            <button key={tag} type="button" onClick={() => setTagSearch(tag)}>
              #{tag}
            </button>
          ))}
        </div>
        <div>
          <label htmlFor="desde">Desde </label>
          <input
            type="date"
            id="desde"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label htmlFor="hasta">Hasta </label>
          <input
            type="date"
            id="hasta"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 ">
          <button
            type="button"
            onClick={() => setSelectedCategory("")}
            className={`rounded-lg border p-3 ${
              selectedCategory === ""
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            Todas
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg border p-3 ${
                selectedCategory === cat
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
