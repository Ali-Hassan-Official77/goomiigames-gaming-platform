import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, Gamepad2, Monitor, Trophy } from "lucide-react";
import { rawgFetch } from "@/lib/rawg";
import RatingBadge from "@/components/RatingBadge";
import SafeImage from "@/components/SafeImage";

export const revalidate = 3600;

async function getGame(id) {
  return rawgFetch(`/games/${id}`);
}

export async function generateMetadata({ params }) {
  try {
    const game = await getGame(params.id);
    return { title: `${game.name} — GoomiiGames`, description: game.description_raw?.slice(0, 155) || `Explore ${game.name} on GoomiiGames.` };
  } catch {
    return { title: "Game — GoomiiGames" };
  }
}

function InfoRow({ label, children, icon: Icon }) {
  if (!children) return null;
  return <div className="detail-row"><dt>{Icon && <Icon size={14} />}{label}</dt><dd>{children}</dd></div>;
}

export default async function GameDetailPage({ params }) {
  const game = await getGame(params.id);

  return (
    <article className="detail-page">
      <div className="detail-hero">
        {game.background_image && <SafeImage src={game.background_image} alt="" fill priority sizes="100vw" className="object-cover" />}
        <div className="detail-hero-shade" />
        <div className="content-shell detail-hero-content">
          <Link href="/games" className="back-link light"><ArrowLeft size={15} /> Back to discover</Link>
          <div className="detail-kicker"><span>GAME PROFILE</span><span>{game.genres?.[0]?.name || "Featured"}</span></div>
          <h1>{game.name}</h1>
          <div className="detail-meta">
            <RatingBadge rating={game.rating} />
            {game.released && <span><CalendarDays size={14} /> {new Date(game.released).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</span>}
            {game.metacritic && <span><Trophy size={14} /> Metacritic {game.metacritic}</span>}
          </div>
        </div>
      </div>

      <div className="content-shell detail-layout">
        <main>
          {game.description_raw && <section className="detail-section"><p className="section-eyebrow">THE WORLD</p><h2>About the game</h2><p className="detail-description">{game.description_raw}</p></section>}

          {game.short_screenshots?.length > 0 && (
            <section className="detail-section">
              <div className="detail-section-head"><div><p className="section-eyebrow">VISUAL LOG</p><h2>Screenshots</h2></div><span>{Math.max(0, game.short_screenshots.length - 1)} frames</span></div>
              <div className="screenshots-grid">
                {game.short_screenshots.slice(1, 7).map((shot) => (
                  <div className="screenshot" key={shot.id}><SafeImage src={shot.image} alt={`${game.name} screenshot`} fill sizes="(max-width: 700px) 92vw, 31vw" className="object-cover" /></div>
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className="detail-sidebar">
          <div className="details-card">
            <div className="details-card-title"><Gamepad2 size={18} /><span>Game details</span></div>
            <dl>
              <InfoRow label="Genres">{game.genres?.map((genre) => genre.name).join(", ")}</InfoRow>
              <InfoRow label="Platforms" icon={Monitor}>{game.platforms?.map((platform) => platform.platform.name).join(", ")}</InfoRow>
              <InfoRow label="Developers">{game.developers?.map((developer) => developer.name).join(", ")}</InfoRow>
              <InfoRow label="Publishers">{game.publishers?.map((publisher) => publisher.name).join(", ")}</InfoRow>
              {game.playtime > 0 && <InfoRow label="Average playtime">{game.playtime} hours</InfoRow>}
            </dl>
            {game.website && <a href={game.website} target="_blank" rel="noopener noreferrer" className="primary-button full">Official website <ArrowUpRight size={16} /></a>}
          </div>
        </aside>
      </div>
    </article>
  );
}
