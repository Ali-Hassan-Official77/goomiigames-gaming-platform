import GameCard from "@/components/GameCard";

export default function GameGrid({ games = [] }) {
  if (!games.length) {
    return (
      <div className="empty-state">
        <span>NO RESULTS</span>
        <h3>Nothing matched that search.</h3>
        <p>Try another title, genre or remove the active filters.</p>
      </div>
    );
  }

  return (
    <div className="game-grid">
      {games.map((game, index) => (
        <div key={game.id} className="game-grid-item" style={{ "--delay": `${Math.min(index, 10) * 45}ms` }}>
          <GameCard game={game} priority={index < 4} />
        </div>
      ))}
    </div>
  );
}
