import Image from "next/image";
import Link from "next/link";

export default function BrandLogo({ compact = false }) {
  return (
    <Link href="/" className="brand-mark" aria-label="GoomiiGames home">
      <Image src="/logo.svg" alt="GoomiiGames" width={157} height={40} priority unoptimized />
    </Link>
  );
}
