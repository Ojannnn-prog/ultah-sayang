import Link from "next/link";
import { ArrowUpRight, Heart, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="home-shell">
      <div className="home-grain" />
      <nav className="site-nav content-width">
        <Link href="/" className="brand-mark"><span className="brand-dot" /> little things</Link>
        <Link href="/create" className="nav-link">make a keepsake <ArrowUpRight size={15} /></Link>
      </nav>

      <section className="home-hero content-width">
        <div className="home-copy">
          <p className="eyebrow"><Sparkles size={15} /> a tiny corner of the internet</p>
          <h1>Make them feel<br /><em>extra loved.</em></h1>
          <p className="home-lede">A birthday scrapbook they can open, explore, and keep close. Fill it with your words, your memories, and all the little things that make them special.</p>
          <div className="home-actions">
            <Link href="/create" className="button button-dark">Create a keepsake <ArrowUpRight size={17} /></Link>
            <Link href="/athaya-22" className="text-link">see a little example <span>→</span></Link>
          </div>
        </div>
        <div className="home-collage" aria-label="A preview of a birthday scrapbook">
          <div className="collage-sun">☼</div>
          <div className="collage-paper collage-paper-back" />
          <div className="collage-paper collage-paper-main">
            <span className="tape tape-top" />
            <p className="collage-small">for someone</p>
            <h2>so<br /><i>very</i><br />loved</h2>
            <Heart className="collage-heart" fill="currentColor" size={27} />
            <p className="collage-script">with all my heart</p>
          </div>
          <div className="collage-note"><span>p.s.</span><br />you make<br />life brighter</div>
          <div className="collage-sticker">✦</div>
        </div>
      </section>

      <section className="home-footer content-width">
        <div><span className="footer-rule" /> designed for the people who make life feel like a celebration</div>
        <div className="footer-heart">made with <Heart size={13} fill="currentColor" /> and a little confetti</div>
      </section>
    </main>
  );
}
