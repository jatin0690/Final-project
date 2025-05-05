import { useState } from "react";

const Filters = ({ assets, setFiltered }) => {
  const [query, setQuery] = useState("");

  const handleFilter = (e) => {
    const q = e.target.value.toLowerCase();
    setQuery(q);
    const filtered = assets.filter((asset) =>
      asset.name.toLowerCase().includes(q) || asset.symbol.toLowerCase().includes(q)
    );
    setFiltered(filtered);
  };

  return (
    <input
      type="text"
      placeholder="Search assets (e.g. Bitcoin, BTC)..."
      value={query}
      onChange={handleFilter}
      className="border p-2 w-full md:w-1/3 rounded-md mb-4"
    />
  );
};

export default Filters;
