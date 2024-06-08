import { useSearchParams } from "react-router-dom";

const FilterArea = () => {
  const [params, setParams] = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = e.target[0].value;

    params.set("query", query);

    setParams(params);
  };

  const handleTag = (e) => {
    e.preventDefault();

    const tag = e.target[0].value;

    params.set("tag", tag);

    setParams(params);
  };

  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1  gap-2 mb-8">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          className="flex-1 border px-2 py-1 rounded-md"
          placeholder="search note by title"
          type="search"
        />

        <button className="bg-green-500 text-white text-xs font-semibold p-2 rounded-md transition hover:bg-green-600">
          Search
        </button>
      </form>

      <form onSubmit={handleTag} className="flex items-center gap-2">
        <input
          className="flex-1 border px-2 py-1 rounded-md"
          placeholder="search note by tag"
          type="search"
        />

        <button className="bg-green-500 text-white text-xs font-semibold p-2 rounded-md transition hover:bg-green-600">
          Search
        </button>
      </form>
    </div>
  );
};

export default FilterArea;
