import Link from "next/link";
import { ArrowUpRight, Layers3, MonitorPlay, Trophy } from "lucide-react";
import Hero from "@/components/Hero";
import GameGrid from "@/components/GameGrid";
import SectionHeading from "@/components/SectionHeading";
import { rawgFetch } from "@/lib/rawg";

export const revalidate = 3600;

async function getHomeData() {
  const [trending, topRated, genres] = await Promise.all([
    rawgFetch("/games", { ordering: "-added", page_size: 8 }),
    rawgFetch("/games", { ordering: "-rating", page_size: 4 }),
    rawgFetch("/genres", { page_size: 10 }),
  ]);
  return {
    trending: trending.results || [],
    topRated: topRated.results || [],
    genres: genres.results || [],
  };
}

export default async function HomePage() {
  const { trending, topRated, genres } = await getHomeData();
  const featured = trending[0] || topRated[0] || null;

  return (
    <>
      <Hero
        game={featured}
        stats={[
          { value: "500K+", label: "Games indexed" },
          { value: "50+", label: "Platforms" },
          { value: "1M+", label: "Community ratings" },
        ]}
      />

      <section className="intro-strip">
        <div className="content-shell intro-grid">
          <div className="intro-label"><span /> WHY GOOMII</div>
          <p>Not another wall of covers. GoomiiGames is built around <strong>discovery</strong> — a cleaner way to move from “what should I play?” to a world you actually want to enter.</p>
        </div>
      </section>

      <section className="content-shell section-space">
        <SectionHeading
          eyebrow="01 / What's moving"
          title="Games on the radar"
          subtitle="Freshly popular titles from the RAWG catalog, presented without the clutter."
          action={<Link href="/games" className="section-action">See all <ArrowUpRight size={16} /></Link>}
        />
        <GameGrid games={trending} />
      </section>

      <section className="genre-section">
        <div className="content-shell section-space">
          <SectionHeading
            eyebrow="02 / Pick a mood"
            title="Enter through a genre"
            subtitle="Start with a feeling instead of a title."
          />
          <div className="genre-grid">
            {genres.slice(0, 8).map((genre, index) => (
              <Link key={genre.id} href={`/games?genres=${genre.slug}`} className="genre-tile">
                <span>0{index + 1}</span>
                <strong>{genre.name}</strong>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="content-shell section-space">
        <div className="signal-panel">
          <div className="signal-copy">
            <span className="section-eyebrow">03 / The signal</span>
            <h2>Good games leave a trace.</h2>
            <p>Ratings, release dates, platforms and community activity come together so you can scan a game in seconds and decide where to dig deeper.</p>
            <Link href="/games" className="primary-button">Explore the library <ArrowUpRight size={17} /></Link>
          </div>
          <div className="signal-stats">
            <div><Trophy size={20} /><strong>Ratings</strong><span>Find what players keep coming back to.</span></div>
            <div><MonitorPlay size={20} /><strong>Platforms</strong><span>See where every world can be played.</span></div>
            <div><Layers3 size={20} /><strong>Details</strong><span>Genres, studios, publishers and more.</span></div>
          </div>
        </div>
      </section>

      <section className="top-rated-section">
        <div className="content-shell section-space">
          <SectionHeading
            eyebrow="04 / The classics"
            title="Highest rated, right now"
            subtitle="A compact shelf of titles that stand out by community rating."
            action={<Link href="/games?ordering=-rating" className="section-action">View ratings <ArrowUpRight size={16} /></Link>}
          />
          <GameGrid games={topRated} />
        </div>
      </section>
    </>
  );
}
