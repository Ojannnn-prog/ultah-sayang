"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowLeft, ArrowRight, ChevronDown, Heart, Headphones, Pause, Play, Sparkles, Volume2, X } from "lucide-react";

type Greeting = {
  recipientName: string;
  dateText: string;
  introMessage: string | null;
  letterPage1: string;
  letterPage2: string | null;
  flowerType: string;
  flowerLabel: string;
  musicUrl: string | null;
  coverBgUrl: string | null;
  compliments: { id: string; noteText: string; orderIndex: number }[];
  photos: { id: string; photoUrl: string; caption: string | null; section: string; orderIndex: number }[];
  letterPages: { id: string; pageNumber: number; title: string; body: string }[];
};

type Props = { greeting: Greeting };
type Section = "hub" | "message" | "flower" | "memories";

const sectionCards = [
  { id: "message" as const, number: "01", title: "A little letter", label: "message", symbol: "✉", description: "Lima halaman yang ditulis pelan-pelan." },
  { id: "flower" as const, number: "02", title: "Flowers for you", label: "flower", symbol: "✿", description: "Bunga yang tidak perlu kamu siram." },
  { id: "memories" as const, number: "03", title: "Little memories", label: "memories", symbol: "◉", description: "Foto, lagu, dan cerita yang masih tinggal." },
];

export function BirthdayExperience({ greeting }: Props) {
  const [started, setStarted] = useState(false);
  const [section, setSection] = useState<Section>("hub");
  const [letterOpen, setLetterOpen] = useState(false);
  const [letterPage, setLetterPage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function startExperience() {
    setStarted(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 }, colors: ["#8B0000", "#D4AF37", "#FFC0CB", "#FFFDF5"] });
    void toggleAudio(true);
  }

  async function toggleAudio(forcePlay?: boolean) {
    const audio = audioRef.current;
    if (!audio || !greeting.musicUrl) return;
    if (!forcePlay && !audio.paused) {
      audio.pause();
      return;
    }

    try {
      setAudioError(false);
      audio.loop = true;
      audio.volume = 0.72;
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
      setAudioError(true);
    }
  }

  function openLetter() {
    setLetterOpen(true);
    setLetterPage(0);
  }

  function nextLetterPage() {
    if (letterPage >= letterPages.length - 1) return;
    const nextPage = letterPage + 1;
    setLetterPage(nextPage);
    if (nextPage === letterPages.length - 1) confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors: ["#C82333", "#D4AF37", "#FFFDD0"] });
  }

  const letterPages = greeting.letterPages.length ? greeting.letterPages : [
    { id: "legacy-1", pageNumber: 1, title: "Untukmu", body: greeting.letterPage1 },
    { id: "legacy-2", pageNumber: 2, title: "Dengan sayang", body: greeting.letterPage2 || "" },
  ];
  const currentLetter = letterPages[letterPage] || letterPages[0];
  const photos = greeting.photos.length ? greeting.photos : [];

  return (
    <main className={`experience-shell ${started ? "is-started" : ""}`} style={greeting.coverBgUrl ? { backgroundImage: `linear-gradient(rgba(53, 7, 13, .48), rgba(53, 7, 13, .7)), url(${greeting.coverBgUrl})` } : undefined}>
      <audio
        ref={audioRef}
        src={greeting.musicUrl || undefined}
        loop
        preload="auto"
        onPlay={() => { setAudioError(false); setPlaying(true); }}
        onPause={() => setPlaying(false)}
        onError={() => { setAudioError(true); setPlaying(false); }}
        aria-hidden="true"
      />
      <div className="experience-grain" />
      <FloatingBits />
      <div className="experience-topbar">
        <span className="experience-brand"><span className="brand-dot" /> little things</span>
        {started && <div className="topbar-actions"><button className="music-toggle" onClick={() => toggleAudio()} title={greeting.musicUrl ? "Toggle music" : "No music added yet"}><span className={playing ? "record-mini playing" : "record-mini"}>◉</span>{greeting.musicUrl ? (playing ? "playing" : audioError ? "tap to retry" : "music off") : "add a song later"}</button><span className="topbar-date">{greeting.dateText}</span></div>}
      </div>

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.section key="cover" className="cover-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: .7 }}>
            <div className="cover-decor cover-decor-left"><span className="cover-tape" /><img src={greeting.coverBgUrl || greeting.photos[0]?.photoUrl || ""} alt="A memory from Athaya" /><span className="cover-sticker">♡</span></div>
            <div className="cover-decor cover-decor-right"><span className="cover-tape" /><img src={greeting.photos[1]?.photoUrl || greeting.coverBgUrl || ""} alt="Another memory" /><span className="cover-sticker">✦</span></div>
            <div className="cover-scribble">made with all my</div>
            <div className="cover-heart" aria-hidden="true">♥</div>
            <p className="cover-kicker">a birthday keepsake for</p>
            <h1>{greeting.recipientName}<span>.</span></h1>
            <p className="cover-date">{greeting.dateText}</p>
            <p className="cover-intro">{greeting.introMessage || "A small collection of big feelings, made just for you."}</p>
            <button className="start-button" onClick={startExperience}><span>open your surprise</span><ArrowRight size={17} /></button>
            <p className="cover-hint"><Headphones size={13} /> turn your sound on for the full feeling</p>
          </motion.section>
        ) : (
          <motion.div key="inside" className="inside-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8 }}>
            <AnimatePresence mode="wait">
              {section === "hub" && <Hub greeting={greeting} onSelect={setSection} />}
              {section === "message" && <MessageSection greeting={greeting} onBack={() => setSection("hub")} onOpen={openLetter} />}
              {section === "flower" && <FlowerSection greeting={greeting} onBack={() => setSection("hub")} />}
              {section === "memories" && <MemoriesSection greeting={greeting} photos={photos} playing={playing} onPlay={() => toggleAudio()} onBack={() => setSection("hub")} />}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{letterOpen && <motion.div className="letter-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="letter-backdrop" onClick={() => setLetterOpen(false)} /><motion.div className="letter-modal" initial={{ y: 40, scale: .96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: .97 }}><button className="close-modal" onClick={() => setLetterOpen(false)} aria-label="Close letter"><X size={19} /></button><div className="letter-paper"><div className="letter-paper-top"><span>untuk {greeting.recipientName}</span><span>halaman {letterPage + 1} / {letterPages.length}</span></div><div className="letter-seal">♥</div><p className="letter-page-title">{currentLetter.title}</p><p className="letter-body">{currentLetter.body || "Ada halaman yang masih menunggu kata-kata."}</p><div className="letter-signoff">dengan sayang,<br /><i>Ojannsss · anak teknik</i><small>kodenya boleh error, sayangnya jangan</small></div><div className="letter-controls"><button disabled={letterPage === 0} onClick={() => setLetterPage((page) => Math.max(0, page - 1))}><ArrowLeft size={15} /> sebelumnya</button>{letterPage < letterPages.length - 1 ? <button onClick={nextLetterPage}>halaman berikutnya <ArrowRight size={15} /></button> : <span className="letter-complete"><Sparkles size={14} /> suratnya sampai sini</span>}</div></div></motion.div></motion.div>}</AnimatePresence>
    </main>
  );
}

function Hub({ greeting, onSelect }: { greeting: Greeting; onSelect: (section: Section) => void }) {
  return <motion.section className="hub-section" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
    <div className="hub-heading"><p className="eyebrow light">welcome to your little scrapbook</p><h2>These are <em>for you,</em><br />{greeting.recipientName}.</h2><p className="hub-subtitle">Pilih satu dulu. Yang lain nggak akan kabur.</p></div>
    <div className="hub-cards">{sectionCards.map((card, index) => <motion.button key={card.id} className={`hub-card hub-card-${index + 1}`} onClick={() => onSelect(card.id)} whileHover={{ y: -8, rotate: index === 1 ? 0 : index === 0 ? -1 : 1 }} whileTap={{ scale: .98 }}><span className="card-number">{card.number}</span><span className="card-symbol">{card.symbol}</span><span className="card-label">{card.label}</span><strong>{card.title}</strong><small>{card.description}</small><span className="card-arrow">↗</span></motion.button>)}</div>
    <p className="scroll-note"><ChevronDown size={14} /> open any little door</p>
  </motion.section>;
}

function MessageSection({ greeting, onBack, onOpen }: { greeting: Greeting; onBack: () => void; onOpen: () => void }) {
  return <motion.section className="module-section message-section" initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -25 }}><ModuleHeader eyebrow="a few words, folded just for you" title="A little letter" onBack={onBack} /><div className="message-layout"><div className="polaroid polaroid-left"><div className="polaroid-photo photo-warm"><span>the good<br />kind of days</span></div><p>keep this close</p></div><div className="envelope-wrap"><motion.button className="envelope" onClick={onOpen} whileHover={{ y: -8 }} whileTap={{ scale: .98 }}><span className="envelope-flap" /><span className="envelope-paper" /><span className="wax-seal">♥</span><span className="envelope-label">click to open</span></motion.button><p className="under-note">there&apos;s something inside</p></div><div className="polaroid polaroid-right"><div className="polaroid-photo photo-rose"><Heart size={25} fill="currentColor" /></div><p>you are loved</p></div></div></motion.section>;
}

function FlowerSection({ greeting, onBack }: { greeting: Greeting; onBack: () => void }) {
  const notes = greeting.compliments.length ? greeting.compliments : [
    { id: "a", noteText: "Sayang, kamu membuat hari biasa terasa istimewa.", orderIndex: 0 },
    { id: "b", noteText: "Cintaku, kebaikanmu selalu tinggal di hati orang.", orderIndex: 1 },
    { id: "c", noteText: "Kamu luar biasa, bahkan saat sedang tidak menyadarinya.", orderIndex: 2 },
    { id: "d", noteText: "Tawamu adalah lagu kecil yang ingin kudengar berulang-ulang.", orderIndex: 3 },
    { id: "e", noteText: "Kalau hidup playlist, kamu lagu favoritnya, sayang.", orderIndex: 4 },
    { id: "f", noteText: "Kamu lucu, cantik, dan nyaris sempurna tanpa perlu berusaha.", orderIndex: 5 },
    { id: "g", noteText: "Dunia terasa lebih lembut sejak ada kamu di dalamnya.", orderIndex: 6 },
    { id: "h", noteText: "Boleh tambah umur, jangan tambah jutek, cintaku.", orderIndex: 7 },
  ];
  return <motion.section className="module-section flower-section" initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -25 }}><ModuleHeader eyebrow="bunga yang nggak perlu disiram" title="Flowers for you" onBack={onBack} /><div className="flower-stage"><div className="flower-copy"><span className="flower-label">{greeting.flowerType} · {greeting.flowerLabel}</span><p>Sayang, bunga ini untukmu. Karena gerbera cantik, tapi kamu tetap yang paling sempurna di ruangan mana pun.</p></div><div className={`bouquet bouquet-${greeting.flowerType.toLowerCase()}`} aria-label={`${greeting.flowerType} bouquet`}><div className="flower-head flower-head-one">✿</div><div className="flower-head flower-head-two">✿</div><div className="flower-head flower-head-three">✿</div><div className="flower-head flower-head-four">✿</div><div className="stem stem-one" /><div className="stem stem-two" /><div className="stem stem-three" /><div className="stem stem-four" /><div className="leaf leaf-one" /><div className="leaf leaf-two" /><div className="bouquet-wrap" /></div><div className="compliment-notes">{notes.slice(0, 8).map((note, index) => <motion.div key={note.id} className={`compliment-note note-${index + 1}`} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 4 + index * .25, ease: "easeInOut" }} whileHover={{ scale: 1.04, rotate: 0 }}><span>✦</span>{note.noteText}</motion.div>)}</div></div></motion.section>;
}

function MemoriesSection({ greeting, photos, playing, onPlay, onBack }: { greeting: Greeting; photos: Greeting["photos"]; playing: boolean; onPlay: () => void; onBack: () => void }) {
  return <motion.section className="module-section memories-section" initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -25 }}><ModuleHeader eyebrow="foto-foto yang nggak boleh hilang" title="Little memories" onBack={onBack} /><div className="memories-layout"><div className="vinyl-card"><div className="vinyl-copy"><span className="vinyl-eyebrow">now playing</span><h3>for the<br /><em>golden days</em></h3><p>{greeting.musicUrl ? "Bee Gees, karena yang klasik biasanya paling kena." : "Your favorite song can live here."}</p></div><button className="vinyl-disc" onClick={onPlay} aria-label={playing ? "Pause music" : "Play music"}><span className="vinyl-groove groove-one" /><span className="vinyl-groove groove-two" /><span className="vinyl-groove groove-three" /><span className="vinyl-label">{playing ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}</span></button><div className="tonearm"><span className="tonearm-head" /></div><div className="vinyl-footer"><Volume2 size={14} /> {greeting.musicUrl ? (playing ? "looping terus" : "putar lagunya") : "add music in the builder"}</div></div><div className="snapshot-board"><span className="board-label">moments worth keeping · 15 little proofs</span>{photos.length ? <div className="snapshot-grid">{photos.slice(0, 15).map((photo, index) => <figure className={`snapshot snapshot-${(index % 6) + 1}`} key={photo.id}><img src={photo.photoUrl} alt={photo.caption || `Memory ${index + 1}`} /><figcaption>{photo.caption || "a day to remember"}</figcaption></figure>)}</div> : <div className="snapshot-grid"><figure className="snapshot"><div className="snapshot-placeholder placeholder-sun">☼</div><figcaption>more memories soon</figcaption></figure></div>}</div></div></motion.section>;
}

function ModuleHeader({ eyebrow, title, onBack }: { eyebrow: string; title: string; onBack: () => void }) {
  return <div className="module-header"><button className="back-to-hub" onClick={onBack}><ArrowLeft size={15} /> all the little things</button><div><p className="eyebrow light">{eyebrow}</p><h2>{title}</h2></div><span className="module-sparkle">✦</span></div>;
}

function FloatingBits() {
  const bits = useMemo(() => ["♡", "✦", "·", "♡", "✧", "·", "♡", "✦"], []);
  return <div className="floating-bits" aria-hidden="true">{bits.map((bit, index) => <motion.span key={index} className={`bit bit-${index + 1}`} animate={{ y: [0, -14, 0], opacity: [.35, .8, .35] }} transition={{ repeat: Infinity, duration: 4 + index * .4, delay: index * .2 }}>{bit}</motion.span>)}</div>;
}
