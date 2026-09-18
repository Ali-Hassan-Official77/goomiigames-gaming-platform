import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import RatingBadge from "@/components/RatingBadge";
import SafeImage from "@/components/SafeImage";

export default function GameCard({ game, priority = false, featured = false }) {
  const genres = (game.genres || []).slice(0, 2);

  return (
    <Link href={`/games/${game.id}`} className={`game-card ${featured ? "featured" : ""}`}>
      <div className="game-card-image">
        {game.background_image ? (
          <SafeImage
            src={game.background_image}
            alt={game.name}
            fill
            priority={priority}
            sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 23vw"
            className="object-cover"
          />
        ) : (
          <div className="image-fallback">No cover</div>
        )}
        <div className="game-card-shade" />
        <div className="game-rating"><RatingBadge rating={game.rating} /></div>
        <span className="card-arrow"><ArrowUpRight size={17} /></span>
      </div>

      <div className="game-card-body">
        <div className="game-card-title-row">
          <h3>{game.name}</h3>
          {game.released && <span>{new Date(game.released).getFullYear()}</span>}
        </div>
        {genres.length > 0 && (
          <div className="game-tags">
            {genres.map((genre) => <span key={genre.id}>{genre.name}</span>)}
          </div>
        )}
        <div className="game-card-footer">
          <span><CalendarDays size={13} /> {game.released ? new Date(game.released).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "Release TBA"}</span>
          <span>Open profile</span>
        </div>
      </div>
    </Link>
  );
}
