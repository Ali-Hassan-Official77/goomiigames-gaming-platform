export default function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="game-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image" />
          <div className="skeleton-lines"><span /><span /><span /></div>
        </div>
      ))}
    </div>
  );
}
