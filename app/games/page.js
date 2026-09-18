import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import GameGrid from "@/components/GameGrid";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import { rawgFetch } from "@/lib/rawg";

export const revalidate = 3600;
export const metadata = { title: "Discover — GoomiiGames" };

async function getGames(searchParams) {
  const [games, genres] = await Promise.all([
    rawgFetch("/games", {
      search: searchParams.search,
      genres: searchParams.genres,
      ordering: searchParams.ordering || "-added",
      page: searchParams.page || 1,
      page_size: 24,
    }),
    rawgFetch("/genres", { page_size: 20 }),
  ]);
  return { games: games.results || [], genres: genres.results || [], count: games.count || 0 };
}

export default async function GamesPage({ searchParams }) {
  const { games, genres, count } = await getGames(searchParams);
  const title = searchParams.search ? `Results for “${searchParams.search}”` : "Explore the library";

  return (
    <section className="content-shell browse-page">
      <div className="browse-hero">
        <Link href="/" className="back-link"><ArrowLeft size={15} /> Back home</Link>
        <div className="browse-title-row">
          <div>
            <p className="section-eyebrow">DISCOVER / {String(count).padStart(3, "0")} RESULTS</p>
            <h1>{title}</h1>
            <p>Search the catalog, narrow it by genre, then open a game for its full profile.</p>
          </div>
          <Link href="/games" className="browse-reset">Reset <ArrowUpRight size={15} /></Link>
        </div>
      </div>

      <div className="browse-toolbar">
        <div className="browse-search"><SearchBar initialValue={searchParams.search || ""} /></div>
        <FilterBar genres={genres} />
      </div>

      <GameGrid games={games} />
    </section>
  );
}
