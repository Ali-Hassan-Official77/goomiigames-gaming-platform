import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <BrandLogo />
            <p className="footer-copy">A visual game discovery space for players who want less noise and more worlds worth exploring.</p>
          </div>
          <div className="footer-links">
            <div><span>Navigate</span><Link href="/">Home</Link><Link href="/games">Discover</Link></div>
            <div><span>Data</span><a href="https://rawg.io" target="_blank" rel="noreferrer">RAWG.io</a><a href="https://rawg.io/apidocs" target="_blank" rel="noreferrer">API docs</a></div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} GoomiiGames</span>
          <span>Game data & images courtesy of RAWG.io</span>
          <span>Built for players.</span>
        </div>
      </div>
    </footer>
  );
}
