import { useEffect, useState } from "react";

export default function SearchBar({ searchProducts }) {
  const [searchInput, setSearchInput] = useState("");

  useEffect(()=>{
    searchProducts(searchInput);
  }, [searchInput])

  return (
    <div>
      <input
      className="search-bar"
        type="text"
        placeholder="Enter Medicine"
        onChange={e => setSearchInput(e.target.value)}
        value={searchInput}
      />
    </div>
  );
}
