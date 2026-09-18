import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="content-shell not-found">
      <span>404 / LOST SIGNAL</span>
      <h1>That world could not be found.</h1>
      <p>The game may have moved, or the link may no longer point to a valid RAWG record.</p>
      <Link href="/games" className="primary-button">Return to discovery <ArrowUpRight size={17} /></Link>
    </div>
  );
}
