"use client";

import { Search, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ initialValue = "", large = false }) {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const query = value.trim();
    router.push(query ? `/games?search=${encodeURIComponent(query)}` : "/games");
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="search-form">
      <div className={`search-box ${large ? "large" : ""}`}>
        <Search size={large ? 20 : 18} aria-hidden="true" />
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search games, genres, worlds..."
          aria-label="Search games"
          autoComplete="off"
        />
        <button type="submit" aria-label="Submit game search">
          <span className="search-button-text">Search</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </form>
  );
}
