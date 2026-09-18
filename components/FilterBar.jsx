"use client";

import { useRouter, useSearchParams } from "next/navigation";

const ORDERINGS = [
  { value: "-added", label: "Most Popular" },
  { value: "-rating", label: "Top Rated" },
  { value: "-released", label: "Newest" },
  { value: "-metacritic", label: "Metacritic" },
];

export default function FilterBar({ genres = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    const query = params.toString();
    router.push(query ? `/games?${query}` : "/games");
  }

  return (
    <div className="filter-row">
      <label className="filter-control">
        <span>Genre</span>
        <select aria-label="Filter by genre" value={searchParams.get("genres") || ""} onChange={(e) => updateParam("genres", e.target.value)}>
          <option value="">All genres</option>
          {genres.map((genre) => <option key={genre.id} value={genre.slug}>{genre.name}</option>)}
        </select>
      </label>
      <label className="filter-control">
        <span>Sort</span>
        <select aria-label="Sort games" value={searchParams.get("ordering") || "-added"} onChange={(e) => updateParam("ordering", e.target.value)}>
          {ORDERINGS.map((order) => <option key={order.value} value={order.value}>{order.label}</option>)}
        </select>
      </label>
    </div>
  );
}
