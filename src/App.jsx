import { useState, useEffect } from "react";
import { Nav } from "./components/Nav.jsx";
import { WebGLHero } from "./components/WebGLHero.jsx";
import { Gallery } from "./components/Gallery.jsx";
import { Bio } from "./components/Bio.jsx";
import { Lightbox } from "./components/Lightbox.jsx";
import { Button } from "./components/Button.jsx";
import { IconDown, IconArrowUpRight } from "./components/Icons.jsx";

const base = import.meta.env.BASE_URL;
const img = (file) => `${base}images/${file}`;

const P = (id, file, title, meta, alt) => ({
  id,
  src: img(file),
  title,
  meta,
  alt,
});

const CURATED = [
  P(
    13,
    "13.webp",
    "Last light, the pier",
    ["Santa Monica", "f/5.6", "1/400s"],
    "Pier silhouette at dusk with birds",
  ),
  P(
    3,
    "3.webp",
    "Gravity, undone",
    ["Venice Beach", "f/4", "1/800s"],
    "Acrobat on rings against a dramatic sky",
  ),
  P(
    6,
    "6.webp",
    "Always on film",
    ["Beverly Blvd", "f/2", "1/60s"],
    "Beverly Cinema marquee at night",
  ),
  P(
    19,
    "19.webp",
    "Stone & water",
    ["Old Delhi", "f/8", "1/250s"],
    "Figure framed in an archway of light",
  ),
  P(
    12,
    "12.webp",
    "Held breath",
    ["Las Vegas", "f/2.8", "1/30s"],
    "Crowd silhouetted before the Bellagio fountains",
  ),
  P(
    8,
    "8.webp",
    "Two, against the white",
    ["Santa Monica", "f/5.6", "1/1000s"],
    "Two figures backlit at the railing",
  ),
  P(
    10,
    "10.webp",
    "The visitor",
    ["Seattle", "f/4", "1/125s"],
    "Silhouettes inside a window-lined hall",
  ),
  P(
    17,
    "17.webp",
    "Kindled",
    ["Old Delhi", "f/1.8", "1/40s"],
    "Hands warming over a small street fire",
  ),
  P(
    4,
    "4.webp",
    "Folded light",
    ["Oculus, NYC", "f/8", "1/200s"],
    "Abstract ribs of light and shadow",
  ),
  P(
    5,
    "5.webp",
    "Low tide",
    ["Santa Monica", "f/5.6", "1/500s"],
    "Pier and gulls at blue hour",
  ),
  P(
    11,
    "11.webp",
    "Under the eaves",
    ["Tokyo", "f/4", "1/160s"],
    "A bird beside its reflection in a puddle",
  ),
  P(
    16,
    "16.webp",
    "Among giants",
    ["Venice Beach", "f/8", "1/640s"],
    "Lone figure beneath tall palms",
  ),
  P(
    2,
    "2.webp",
    "Still water",
    ["Salton Sea", "f/11", "4s"],
    "A small structure on a glassy lake",
  ),
  P(
    7,
    "7.webp",
    "Wingbeat",
    ["Old Delhi", "f/5.6", "1/1250s"],
    "Children crossing a field as kites wheel overhead",
  ),
  P(
    9,
    "9.webp",
    "Quiet hours",
    ["Seattle", "f/4", "1/90s"],
    "Sunlit room of tall windows",
  ),
  P(
    14,
    "14.webp",
    "Morning walk",
    ["Embarcadero, SF", "f/8", "1/800s"],
    "Couple walking past the Bay Bridge at sunrise",
  ),
];

const REST = [
  1, 15, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  37, 38, 39, 40, 41, 42, 43,
].map((n) =>
  P(
    n,
    `${n}.webp`,
    `No. ${String(n).padStart(2, "0")}`,
    ["Los Angeles"],
    "Street photograph by Harsha Pamu",
  ),
);

const PLATES = [...CURATED, ...REST];

const HERO_IMAGES = [
  "1.webp",
  "30.webp",
  "9.webp",
  "14.webp",
  "29.webp",
  "25.webp",
  "2.webp",
  "28.webp",
].map(img);

const hS = {
  wrap: {
    position: "relative",
    height: "100vh",
    minHeight: 600,
    overflow: "hidden",
    background: "var(--sz-ink)",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "0 var(--sz-gutter) clamp(48px,9vh,110px)",
    pointerEvents: "none",
  },
  eyebrow: {
    fontFamily: "var(--sz-font-mono)",
    fontSize: 12,
    letterSpacing: "var(--sz-track-widest)",
    textTransform: "uppercase",
    color: "#ffffff",
    marginBottom: 24,
    textShadow: "0 1px 3px rgba(0,0,0,0.95), 0 2px 12px rgba(0,0,0,0.85), 0 0 30px rgba(0,0,0,0.7)",
  },
  sub: {
    fontFamily: "var(--sz-font-display)",
    fontStyle: "italic",
    fontWeight: 400,
    fontSize: "clamp(1.2rem,2.4vw,1.9rem)",
    color: "#ececed",
    marginTop: 18,
    textShadow: "0 1px 24px rgba(0,0,0,0.6)",
  },
  cue: {
    position: "absolute",
    left: "var(--sz-gutter)",
    bottom: 22,
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontFamily: "var(--sz-font-mono)",
    fontSize: 10,
    letterSpacing: "var(--sz-track-widest)",
    textTransform: "uppercase",
    color: "#e2e2e4",
    zIndex: 10,
    textShadow: "0 1px 14px rgba(0,0,0,0.7)",
  },
};

function Hero({ onNav }) {
  return (
    <header id="top" style={hS.wrap}>
      <WebGLHero images={HERO_IMAGES} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          background:
            "linear-gradient(to top, rgba(6,6,7,0.92) 0%, rgba(6,6,7,0.72) 30%, rgba(6,6,7,0.45) 55%, rgba(6,6,7,0.28) 75%, rgba(6,6,7,0.34) 100%)",
        }}
      />
      <div style={hS.overlay}>
        <h1 className="sz-rise sz-rise-1" style={hS.sub}>
          A monochrome record of the street, unposed.
        </h1>
     
        {/* <div
          className="sz-rise sz-rise-2"
          style={{
            marginTop: 38,
            display: "flex",
            gap: 14,
            pointerEvents: "auto",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="solid"
            onClick={() => onNav("work")}
            style={{
              background: "var(--sz-paper)",
              color: "var(--sz-ink)",
              borderColor: "var(--sz-paper)",
            }}
          >
            View the work
          </Button>
          <Button
            variant="outline"
            onClick={() => onNav("bio")}
            style={{
              color: "var(--sz-paper)",
              borderColor: "rgba(255,255,255,0.4)",
            }}
          >
            About Harsha
          </Button>
        </div> */}
      </div>
      {/* <div className="sz-scroll-cue" style={hS.cue}>
        <IconDown size={14} aria-hidden /> Scroll
      </div> */}
    </header>
  );
}

const fS = {
  foot:  { background: "var(--sz-ink)", borderTop: "1px solid var(--sz-ink-700)", 
    padding: "var(--sz-space-6) var(--sz-gutter) var(--sz-space-6)" },
  inner: { maxWidth: "var(--sz-maxw)", margin: "0 auto" },
  big:   { fontFamily: "var(--sz-font-display)", fontSize: "var(--sz-display-md)", fontWeight: 500, letterSpacing: "var(--sz-track-tight)", lineHeight: 1, color: "var(--sz-paper)", margin: "0 0 40px" },
  row:   { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 18, 
    // borderTop: "1px solid var(--sz-ink-700)",
     paddingTop: 2 },
  small: { fontFamily: "var(--sz-font-mono)", fontSize: 11, letterSpacing: "var(--sz-track-wide)", textTransform: "uppercase", color: "var(--sz-text-faint)" },
};

function Footer() {
  return (
    <footer style={fS.foot}>
      {/* <div style={fS.inner}>
        <p style={fS.big}>Let's talk prints<br />&amp; commissions.</p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
          <Button variant="accent" href="https://www.instagram.com/shellzero" target="_blank" iconRight={<IconArrowUpRight size={15} />}>
            @shellzero
          </Button>
        </div> */}
        <div style={fS.row}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src={img("logo.svg")} width="38" height="25" alt="shellzero" />
            <span style={fS.small}>© 2026 Harsha Pamu · All rights reserved</span>
          </div>
          <span style={fS.small}>Made in monochrome</span>
        </div>
      {/* </div> */}
    </footer>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  const [lb, setLb] = useState(null);
  useReveal();

  const scrollTo = (id) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 40,
        behavior: "smooth",
      });
  };

  return (
    <>
      <a href="#main-content" className="sz-skip-link">Skip to content</a>
      <Nav onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <main id="main-content">
        <Gallery plates={PLATES} onOpen={setLb} />
        <Bio profileSrc={img("profile.webp")} />
      </main>
      <Footer />
      <Lightbox
        plates={PLATES}
        index={lb}
        onClose={() => setLb(null)}
        onIndex={setLb}
      />
    </>
  );
}
