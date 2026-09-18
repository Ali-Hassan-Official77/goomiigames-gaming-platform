import { Star } from "lucide-react";

export default function RatingBadge({ rating }) {
  if (!rating) return null;

  return (
    <span className="rating-badge">
      <Star size={12} fill="currentColor" /> {Number(rating).toFixed(1)}
    </span>
  );
}
