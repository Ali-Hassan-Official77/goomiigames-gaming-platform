"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight, Play, Sparkles } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import SafeImage from "@/components/SafeImage";

const ease = [0.22, 1, 0.36, 1];

export default function Hero({ game, stats }) {
  const image = game?.background_image;

  return (
    <section className="hero-shell">
      <div className="hero-noise" />
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />

      <div className="hero-inner">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease }}
        >
          <div className="hero-kicker">
            <Sparkles size={13} />
            The playground for curious players
          </div>
          <h1>
            Find a world.
            <span> Make it yours.</span>
          </h1>
          <p>
            GoomiiGames turns the huge world of gaming into a fast, visual discovery space — ratings, platforms, releases and screenshots without the clutter.
          </p>
          <div className="hero-search-wrap">
            <SearchBar large />
          </div>
          <div className="hero-actions">
            <Link href="/games" className="primary-button">
              Browse the library <ArrowDownRight size={17} />
            </Link>
            <span className="hero-note"><Play size={13} fill="currentColor" /> Fresh picks updated regularly</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-feature"
          initial={{ opacity: 0, scale: 0.96, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          <div className="feature-frame">
            <div className="feature-image">
              {image ? (
                <SafeImage src={image} alt={game.name} fill priority sizes="(max-width: 900px) 92vw, 48vw" className="object-cover" />
              ) : (
                <div className="feature-empty">GoomiiGames</div>
              )}
            </div>
            <div className="feature-overlay" />
            <div className="feature-label">ON THE RADAR</div>
            <div className="feature-content">
              <div className="feature-meta">Featured discovery · {game?.rating ? `${game.rating.toFixed(1)} rating` : "Worth a look"}</div>
              <h2>{game?.name || "Your next obsession"}</h2>
              <Link href={game ? `/games/${game.id}` : "/games"} className="feature-link">
                View game <ArrowDownRight size={17} />
              </Link>
            </div>
            <div className="feature-corner">01 / 04</div>
          </div>
        </motion.div>
      </div>

      <div className="hero-stats">
        {stats?.map((stat, index) => (
          <div className="hero-stat" key={stat.label}>
            <span className="stat-index">0{index + 1}</span>
            <div>
              <strong>{stat.value}</strong>
              <small>{stat.label}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
