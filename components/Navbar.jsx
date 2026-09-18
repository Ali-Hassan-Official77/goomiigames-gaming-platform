"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Compass, Menu, Search, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const links = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Discover" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Primary">
        <BrandLogo compact />

        <div className="desktop-nav">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link key={link.href} href={link.href} className={`nav-link ${active ? "active" : ""}`}>
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="nav-actions">
          <Link href="/games" className="nav-search-link" aria-label="Search games">
            <Search size={17} />
          </Link>
          <Link href="/games" className="nav-cta">
            <Compass size={16} />
            Explore
          </Link>
          <button
            className="mobile-menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mobile-menu">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="mobile-menu-link">
              {link.label}
            </Link>
          ))}
          <Link href="/games" onClick={() => setOpen(false)} className="mobile-menu-cta">
            <Compass size={16} /> Explore games
          </Link>
        </div>
      )}
    </header>
  );
}
