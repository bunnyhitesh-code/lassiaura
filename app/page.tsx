"use client";

import { useState, useEffect, useRef } from "react";

// ── CONSTANTS ────────────────────────────────────────────
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

// ── NAVBAR ───────────────────────────────────────────────
function Navbar({ onBook }: { onBook: () => void }) {
  useEffect(() => {}, []);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-5"
      style={{ background: "transparent" }}>
      <div className="flex items-center gap-3">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="15" fill="rgba(181,137,10,0.08)" stroke="rgba(181,137,10,0.35)" strokeWidth="0.5"/>
          <path d="M10 20 Q16 10 22 20" stroke="#B5890A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <circle cx="16" cy="12" r="3" fill="#B5890A"/>
          <path d="M13 20 Q16 23 19 20" stroke="#B5890A" strokeWidth="1" fill="none" strokeLinecap="round"/>
        </svg>
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1.25rem", color: "#F5F0E8", letterSpacing: "0.15em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          Lassi <span style={{ color: "#B5890A" }}>Aura</span>
        </span>
      </div>
      <div className="hidden md:flex gap-10">
        {[["#experience","Experience"],["#packages","Packages"],["#engage","Book"]].map(([href,label]) => (
          <a key={href} href={href}
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.7)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#B5890A")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.7)")}>
            {label}
          </a>
        ))}
      </div>
      <button onClick={onBook} className="btn-gold" style={{ padding: "10px 24px", fontSize: "0.7rem" }}>
        Get a quote
      </button>
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────
function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "#080608" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #B5890A 0%, transparent 70%)" }} />
      </div>
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 opacity-15 hidden lg:block">
        <HeroGlass />
      </div>
      <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(181,137,10,0.8)", marginBottom: "28px" }}>
          Premium lassi catering · At your event
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: "clamp(3rem, 7vw, 6rem)", color: "#F5F0E8", lineHeight: 1.1, letterSpacing: "-0.01em", fontStyle: "italic", marginBottom: "28px" }}>
          Experience the real aura with Lassi Aura.
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.95rem", color: "rgba(245,240,232,0.6)", letterSpacing: "0.08em", lineHeight: 1.8, maxWidth: "480px", margin: "0 auto 48px" }}>
          Not every event gets Lassi Aura. Yours might.
        </p>
        <div className="flex gap-4 justify-center flex-wrap mb-10">
          <button onClick={onBook} className="btn-gold">
            Request the Aura
          </button>
          <a href="#experience">
            <button className="btn-ghost">
              See how it works
            </button>
          </a>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)" }}>
          Weddings · Corporate · House parties · Cultural gatherings
        </p>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.3 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#F5F0E8" }}>Scroll</span>
        <div className="w-px h-8" style={{ background: "rgba(245,240,232,0.4)", animation: "scrollPulse 2s ease-in-out infinite" }} />
      </div>
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.2; transform: scaleY(0.5); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
        }
      `}</style>
    </section>
  );
}

// ── HERO GLASS ANIMATION ──────────────────────────────────
function HeroGlass() {
  return (
    <div className="relative w-48 h-72">
      <style>{`
        @keyframes fillUp { 0% { height: 0%; } 100% { height: 72%; } }
        @keyframes steamRise { 0% { opacity: 0; transform: translateY(0) scaleX(1); } 50% { opacity: 0.4; } 100% { opacity: 0; transform: translateY(-30px) scaleX(1.5); } }
        @keyframes dropFall { 0% { opacity: 0; top: 0px; } 20% { opacity: 1; } 100% { opacity: 0; top: 80px; } }
        @keyframes glassGlow { 0%, 100% { filter: drop-shadow(0 0 8px rgba(181,137,10,0.2)); } 50% { filter: drop-shadow(0 0 20px rgba(181,137,10,0.4)); } }
      `}</style>
      <svg viewBox="0 0 120 180" className="w-full h-full" style={{ animation: "glassGlow 3s ease-in-out infinite" }}>
        <defs>
          <clipPath id="glassClip">
            <path d="M25 20 L15 160 Q15 170 30 170 L90 170 Q105 170 105 160 L95 20 Z" />
          </clipPath>
        </defs>
        <path d="M25 20 L15 160 Q15 170 30 170 L90 170 Q105 170 105 160 L95 20 Z"
          fill="none" stroke="rgba(245,240,232,0.2)" strokeWidth="1.5" />
        <g clipPath="url(#glassClip)">
          <rect x="0" y="50" width="120" height="130" fill="rgba(181,137,10,0.4)"
            style={{ animation: "fillUp 3s ease-out forwards" }} />
          <ellipse cx="60" cy="50" rx="40" ry="8" fill="rgba(245,240,232,0.15)" />
        </g>
        <path d="M60 0 Q65 10 60 20" stroke="rgba(181,137,10,0.6)" strokeWidth="4" strokeLinecap="round"
          style={{ animation: "dropFall 2s ease-in infinite" }} />
        <path d="M35 30 L30 150" stroke="rgba(255,255,255,0.08)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {[0,1,2].map(i => (
        <div key={i} className="absolute w-1 h-4 rounded-full"
          style={{ background: "rgba(245,240,232,0.15)", left: `${35 + i * 15}%`, top: "15%",
            animation: `steamRise ${1.5 + i * 0.4}s ease-out infinite`, animationDelay: `${i * 0.5}s` }} />
      ))}
    </div>
  );
}

// ── AURA IS ───────────────────────────────────────────────
function AuraIs() {
  return (
    <section style={{ background: "#080608", paddingTop: "100px", paddingBottom: "100px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 400, fontStyle: "italic", color: "#B5890A", marginBottom: "32px", lineHeight: 1.2 }}>
          The Aura is the event.
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.95rem", color: "rgba(245,240,232,0.75)", lineHeight: 2, marginBottom: "20px" }}>
          When Lassi Aura arrives, the room changes. People notice. They photograph it. They ask who organised it. The event becomes more valuable because we are in it.
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem", fontStyle: "italic", fontWeight: 300, color: "rgba(245,240,232,0.4)" }}>
          We are not a catering company. We are the detail that elevates everything around us.
        </p>
      </div>
    </section>
  );
}

// ── VIDEO SLIDER ──────────────────────────────────────────
const slides = [
  { id: "pour",  label: "The Order",      price: "from $6",  title: "Crafted with precision",   sub: "Every glass poured with care. Fresh ingredients, authentic technique.", tag: "Single serve · 400ml" },
  { id: "booth", label: "The Experience", price: "from $10", title: "A live premium booth",       sub: "We set up, we perform. Your guests watch the art happen in real time.", tag: "Live booth · Full event" },
  { id: "crowd", label: "The Craft",      price: "from $15", title: "Built around your vision",  sub: "Custom flavours, branded setup, dedicated coordinator. Fully bespoke.", tag: "Bespoke · Your brand" },
];

function VideoSlider({ onBook }: { onBook: (pkg: string) => void }) {
  const [active, setActive] = useState(0);
  const [duration, setDuration] = useState(5);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null]);
  const activeRef = useRef(0);
  activeRef.current = active;

  const advance = () => setActive(a => (a + 1) % slides.length);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        v.play().catch(() => {});
        if (!isNaN(v.duration)) setDuration(v.duration);
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [active]);

  return (
    <section id="experience" style={{ background: "#080608", paddingTop: "96px", paddingBottom: "96px", paddingLeft: "32px", paddingRight: "32px" }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", textAlign: "center", marginBottom: "12px" }}>
        The experience
      </p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F5F0E8", textAlign: "center", marginBottom: "56px" }}>
        Three levels of the Aura
      </h2>

      <div className="max-w-5xl mx-auto">
        {/* Slide display */}
        <div className="relative overflow-hidden mb-6" style={{ height: "420px", isolation: "isolate" }}>
          {slides.map((s, i) => (
            <div key={s.id} className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: active === i ? 1 : 0 }}>
              <SlideAnimation
                id={s.id}
                setRef={(el) => { videoRefs.current[i] = el; }}
                onEnded={advance}
                onLoadedMetadata={() => {
                  if (i !== activeRef.current) return;
                  const v = videoRefs.current[i];
                  if (v) setDuration(v.duration);
                }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,6,8,0.92) 0%, rgba(8,6,8,0.3) 55%, transparent 100%)" }} />
              <div className="absolute bottom-8 left-0 right-0 px-10">
                <span style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,232,0.6)", border: "1px solid rgba(245,240,232,0.2)", padding: "6px 14px", marginBottom: "16px" }}>
                  {s.tag}
                </span>
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#F5F0E8", lineHeight: 1.1, marginBottom: "8px" }}>
                      {s.title}
                    </h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: "rgba(245,240,232,0.65)", lineHeight: 1.8 }}>
                      {s.sub}
                    </p>
                  </div>
                  <button onClick={() => onBook(s.label)} className="btn-gold flex-shrink-0"
                    style={{ padding: "12px 28px", fontSize: "0.7rem" }}>
                    Request {s.label}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide tabs */}
        <div className="grid grid-cols-3">
          {slides.map((s, i) => (
            <button key={s.id} onClick={() => setActive(i)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: active === i ? "1px solid #B5890A" : "1px solid transparent",
                padding: "20px 16px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s",
              }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: active === i ? "#B5890A" : "rgba(245,240,232,0.4)", marginBottom: "4px", transition: "color 0.2s" }}>
                {s.label}
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem", fontWeight: 400, color: active === i ? "#F5F0E8" : "rgba(245,240,232,0.3)" }}>
                {s.price} / glass
              </div>
              {active === i && (
                <div className="mt-3 overflow-hidden" style={{ height: "1px", background: "rgba(245,240,232,0.08)" }}>
                  <div style={{ height: "100%", background: "#B5890A", animation: `progress ${duration}s linear forwards` }} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </section>
  );
}

// ── SLIDE ANIMATIONS ──────────────────────────────────────
interface VideoSlideProps {
  setRef: (el: HTMLVideoElement | null) => void;
  onEnded: () => void;
  onLoadedMetadata: () => void;
}

function SlideAnimation({ id, setRef, onEnded, onLoadedMetadata }: { id: string } & VideoSlideProps) {
  const p: VideoSlideProps = { setRef, onEnded, onLoadedMetadata };
  if (id === "pour") return <PourVideo {...p} />;
  if (id === "booth") return <BoothVideo {...p} />;
  return <CrowdVideo {...p} />;
}

function PourVideo({ setRef, onEnded, onLoadedMetadata }: VideoSlideProps) {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ background: "#080608" }}>
      <video ref={setRef} autoPlay muted playsInline onEnded={onEnded} onLoadedMetadata={onLoadedMetadata}
        className="absolute inset-0 w-full h-full object-contain" src="/order.mp4" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,6,8,0.75) 35%, rgba(8,6,8,0.2) 70%, transparent 100%)" }} />
    </div>
  );
}

function BoothVideo({ setRef, onEnded, onLoadedMetadata }: VideoSlideProps) {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ background: "#080608" }}>
      <video ref={setRef} autoPlay muted playsInline onEnded={onEnded} onLoadedMetadata={onLoadedMetadata}
        className="absolute inset-0 w-full h-full object-contain" src="/booth.mp4" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,6,8,0.75) 35%, rgba(8,6,8,0.2) 70%, transparent 100%)" }} />
    </div>
  );
}

function CrowdVideo({ setRef, onEnded, onLoadedMetadata }: VideoSlideProps) {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ background: "#080608" }}>
      <video ref={setRef} autoPlay muted playsInline onEnded={onEnded} onLoadedMetadata={onLoadedMetadata}
        className="absolute inset-0 w-full h-full object-contain" src="/craft.mp4" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(8,6,8,0.75) 35%, rgba(8,6,8,0.2) 70%, transparent 100%)" }} />
    </div>
  );
}

// ── SOCIAL PROOF ──────────────────────────────────────────
const testimonials = [
  { quote: "Best part of our wedding. Guests are still talking about the booth three months later.", name: "Priya S.", event: "Wedding · Austin, TX" },
  { quote: "Set up on time, stayed all evening, zero stress. Exactly what a corporate event needs.", name: "Michael R.", event: "Corporate event · Dallas, TX" },
  { quote: "Custom mango flavour for our Diwali party was absolutely perfect. Will book every year.", name: "Aisha K.", event: "Cultural gathering · Houston, TX" },
];

function SocialProof() {
  return (
    <section style={{ background: "#0D090B", paddingTop: "80px", paddingBottom: "80px", paddingLeft: "32px", paddingRight: "32px" }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", textAlign: "center", marginBottom: "12px" }}>
        What people say
      </p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#F5F0E8", textAlign: "center", marginBottom: "48px" }}>
        Guests remember Lassi Aura
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px max-w-5xl mx-auto" style={{ border: "1px solid rgba(245,240,232,0.08)", background: "rgba(245,240,232,0.08)" }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{ background: "#1A1015", padding: "32px" }}>
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, s) => (
                <span key={s} style={{ color: "#B5890A", fontSize: "0.75rem" }}>★</span>
              ))}
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.9rem", color: "rgba(245,240,232,0.7)", lineHeight: 1.9, fontStyle: "italic", marginBottom: "24px" }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#B5890A", marginBottom: "4px" }}>
              {t.name}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.65rem", color: "rgba(245,240,232,0.35)", letterSpacing: "0.05em" }}>
              {t.event}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-8 mt-12">
        {["Nationwide service","Premium ingredients","Live at your event","24hr confirmation"].map(b => (
          <div key={b} className="flex items-center gap-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.7rem", color: "rgba(245,240,232,0.4)", letterSpacing: "0.08em" }}>
            <span style={{ width: "4px", height: "4px", background: "#B5890A", flexShrink: 0 }} />
            {b}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── PACKAGES ──────────────────────────────────────────────
const pkgData = [
  {
    num: "01", name: "The Order", price: "from $6", unit: "/ glass (400ml)", featured: false,
    desc: "Fresh lassi delivered ready to serve. You choose the flavours, we handle the rest.",
    features: ["Fresh made to order","4 signature flavours","Minimum 20 glasses","Delivered event-ready"],
  },
  {
    num: "02", name: "The Experience", price: "from $10", unit: "/ glass (400ml)", featured: true,
    desc: "Live premium booth. We set up, we perform, we pour. Guests watch the craft in real time.",
    features: ["Full live booth setup","Artistic pour techniques","Premium bar-style presentation","We stay the full event"],
  },
  {
    num: "03", name: "The Craft", price: "from $15", unit: "/ glass (400ml)", featured: false,
    desc: "Fully bespoke. Custom flavours, branded cups, themed booth. Built around your vision.",
    features: ["Everything in The Experience","Custom signature flavour","Branded cups & packaging","Dedicated coordinator"],
  },
];

function Packages({ onBook }: { onBook: (pkg: string) => void }) {
  return (
    <section id="packages" style={{ background: "#080608", paddingTop: "80px", paddingBottom: "80px", paddingLeft: "32px", paddingRight: "32px" }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", textAlign: "center", marginBottom: "12px" }}>
        Our packages
      </p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F5F0E8", textAlign: "center", marginBottom: "16px" }}>
        Three levels of the Aura
      </h2>
      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: "rgba(245,240,232,0.4)", textAlign: "center", maxWidth: "480px", margin: "0 auto 56px", lineHeight: 1.8 }}>
        Three packages built for different occasions. All include fresh ingredients, authentic technique, and our commitment to making your event memorable.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px max-w-5xl mx-auto" style={{ background: "rgba(245,240,232,0.08)" }}>
        {pkgData.map(p => (
          <div key={p.name} style={{
            background: p.featured ? "#1A1015" : "#120D0F",
            border: p.featured ? "1px solid rgba(181,137,10,0.4)" : "none",
            padding: "40px 32px",
            position: "relative",
          }}>
            {p.featured && (
              <div style={{ position: "absolute", top: "16px", right: "16px", fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B5890A" }}>
                Most requested
              </div>
            )}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "8px" }}>
              {p.num}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)", marginBottom: "20px" }}>
              {p.name}
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 400, color: "#F5F0E8", marginBottom: "4px", lineHeight: 1 }}>
              {p.price}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 300, color: "rgba(245,240,232,0.4)", marginBottom: "20px", letterSpacing: "0.05em" }}>
              {p.unit}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.8, marginBottom: "24px" }}>
              {p.desc}
            </p>
            <ul style={{ marginBottom: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {p.features.map(f => (
                <li key={f} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: "rgba(245,240,232,0.5)", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "16px", height: "1px", background: "#B5890A", flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
            <button onClick={() => onBook(p.name)} className="btn-gold" style={{ width: "100%", padding: "14px 0" }}>
              Request {p.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── ENGAGEMENT ────────────────────────────────────────────
function Engagement() {
  const [tab, setTab] = useState<"book"|"quote"|"hello">("book");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", type: "", guests: "", notes: "", city: "", package: "" });

  const today = new Date(); today.setHours(0,0,0,0);
  const minDate = new Date(today); minDate.setDate(today.getDate() + 14);
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y=>y-1); } else setViewMonth(m=>m-1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y=>y+1); } else setViewMonth(m=>m+1); };

  const handleSubmit = async () => {
    if (!form.name || !form.email || (tab === "book" && (!form.type || !selectedDate))) {
      alert("Please fill in all required fields."); return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: selectedDate, tab }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { alert(data.error || "Something went wrong."); return; }
      setSubmitted(true);
    } catch { alert("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const tabs = [
    { id: "book", label: "Book an event" },
    { id: "quote", label: "Get a quote" },
    { id: "hello", label: "Say hello" },
  ] as const;

  const labelStyle = { fontFamily: "'Inter', sans-serif" as const, fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.5)", marginBottom: "4px" };

  return (
    <section id="engage" style={{ background: "#0D090B", paddingTop: "80px", paddingBottom: "80px", paddingLeft: "32px", paddingRight: "32px" }}>
      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", textAlign: "center", marginBottom: "12px" }}>
        Get in touch
      </p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F5F0E8", textAlign: "center", marginBottom: "12px" }}>
        Let&apos;s make it happen
      </h2>
      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.85rem", color: "rgba(245,240,232,0.4)", textAlign: "center", maxWidth: "380px", margin: "0 auto 48px", lineHeight: 1.8 }}>
        Ready to book, want a quote, or just curious? We respond within 24 hours.
      </p>

      <div className="max-w-xl mx-auto">
        {/* Tabs */}
        <div className="flex mb-8" style={{ borderBottom: "1px solid rgba(245,240,232,0.1)" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setSubmitted(false); }}
              style={{
                flex: 1, background: "transparent", border: "none",
                borderBottom: tab === t.id ? "1px solid #B5890A" : "1px solid transparent",
                marginBottom: "-1px",
                padding: "12px 0",
                fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.75rem",
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: tab === t.id ? "#B5890A" : "rgba(245,240,232,0.4)",
                cursor: "pointer", transition: "all 0.2s",
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <div style={{ width: "40px", height: "40px", border: "1px solid rgba(181,137,10,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <span style={{ color: "#B5890A", fontSize: "1.2rem" }}>✓</span>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontSize: "1.3rem", color: "#F5F0E8", marginBottom: "8px" }}>We&apos;ve got your message.</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: "rgba(245,240,232,0.4)" }}>We&apos;ll be in touch within 24 hours.</p>
          </div>
        ) : (
          <>
            {/* Book tab — with calendar */}
            {tab === "book" && (
              <div className="mb-6" style={{ background: "#120D0F", border: "1px solid rgba(245,240,232,0.08)", padding: "20px" }}>
                <div className="flex justify-between items-center mb-4">
                  <button onClick={prevMonth} style={{ width: "28px", height: "28px", background: "transparent", border: "1px solid rgba(245,240,232,0.15)", color: "rgba(245,240,232,0.6)", cursor: "pointer", borderRadius: 0, fontFamily: "'Inter', sans-serif", fontSize: "1rem" }}>‹</button>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.8rem", letterSpacing: "0.1em", color: "#F5F0E8" }}>{MONTHS[viewMonth]} {viewYear}</span>
                  <button onClick={nextMonth} style={{ width: "28px", height: "28px", background: "transparent", border: "1px solid rgba(245,240,232,0.15)", color: "rgba(245,240,232,0.6)", cursor: "pointer", borderRadius: 0, fontFamily: "'Inter', sans-serif", fontSize: "1rem" }}>›</button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAYS.map(d => <div key={d} className="text-center" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(245,240,232,0.3)", padding: "4px 0" }}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1 mb-3">
                  {Array.from({ length: firstDay }).map((_,i) => <div key={i} />)}
                  {Array.from({ length: daysInMonth }).map((_,i) => {
                    const day = i + 1;
                    const dateObj = new Date(viewYear, viewMonth, day);
                    const dateStr = `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
                    const disabled = dateObj < minDate;
                    const selected = selectedDate === dateStr;
                    return (
                      <button key={day} disabled={disabled} onClick={() => setSelectedDate(dateStr)}
                        style={{
                          background: selected ? "#B5890A" : "transparent",
                          border: selected ? "none" : "none",
                          borderRadius: 0,
                          color: disabled ? "rgba(245,240,232,0.2)" : selected ? "#080608" : "rgba(245,240,232,0.6)",
                          fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.75rem",
                          padding: "6px 0", cursor: disabled ? "not-allowed" : "pointer",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={e => { if (!disabled && !selected) e.currentTarget.style.background = "rgba(181,137,10,0.15)"; }}
                        onMouseLeave={e => { if (!disabled && !selected) e.currentTarget.style.background = "transparent"; }}>
                        {day}
                      </button>
                    );
                  })}
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.7rem", color: "rgba(245,240,232,0.25)", letterSpacing: "0.05em" }}>
                  Dates within the next 14 days are unavailable.
                </p>
              </div>
            )}

            {/* Package interest */}
            <div className="flex flex-col mb-6">
              <label style={labelStyle}>Package interest</label>
              <select className="select-underline" value={form.package} onChange={e => setForm({...form, package: e.target.value})}>
                <option>Not sure yet</option>
                <option>The Order — from $6 / glass</option>
                <option>The Experience — from $10 / glass</option>
                <option>The Craft — from $15 / glass</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col">
                <label style={labelStyle}>Your name</label>
                <input className="input-underline" placeholder="Alex Johnson" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="flex flex-col">
                <label style={labelStyle}>Email address</label>
                <input className="input-underline" placeholder="AJ@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
            </div>

            {tab !== "hello" && (
              <>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col">
                    <label style={labelStyle}>Event type</label>
                    <select className="select-underline" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                      <option value="">Select</option>
                      <option>Wedding</option>
                      <option>Corporate event</option>
                      <option>House party</option>
                      <option>Cultural gathering</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label style={labelStyle}>Guest count</label>
                    <input type="number" min={50} max={10000} className="input-underline" placeholder="Min 50 guests" value={form.guests} onChange={e => setForm({...form, guests: e.target.value})} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.65rem", color: "rgba(245,240,232,0.25)", marginTop: "6px" }}>Minimum 50 glasses · Maximum 10,000</span>
                  </div>
                </div>
                <div className="flex flex-col mb-6">
                  <label style={labelStyle}>Your city</label>
                  <input className="input-underline" placeholder="Austin, TX" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
                </div>
              </>
            )}

            <div className="flex flex-col mb-8">
              <label style={labelStyle}>{tab === "hello" ? "Your message" : "Additional notes"}</label>
              <textarea className="input-underline" rows={3} style={{ resize: "none" }}
                placeholder={tab === "hello" ? "What's on your mind?" : "Location, special requests, dietary requirements..."}
                value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
            </div>

            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.75rem", color: "rgba(245,240,232,0.4)", textAlign: "center", marginBottom: "16px" }}>
              We confirm within 24 hours. Not all dates are available.
            </p>
            <button onClick={handleSubmit} disabled={loading} className="btn-gold" style={{ width: "100%", padding: "16px 0" }}>
              {loading ? "Sending..." : tab === "book" ? "Request the Aura" : tab === "quote" ? "Request a quote" : "Send message"}
            </button>
          </>
        )}

        {/* Direct contact */}
        <div className="flex justify-center gap-6 mt-8">
          <a href="mailto:hello@lassiaura.com"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.7rem", color: "rgba(245,240,232,0.3)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#B5890A")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.3)")}>
            hello@lassiaura.com
          </a>
          <span style={{ color: "rgba(245,240,232,0.1)" }}>|</span>
          <a href="https://wa.me/1234567890"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.7rem", color: "rgba(245,240,232,0.3)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#B5890A")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.3)")}>
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}

// ── AURA IS SELECTIVE ─────────────────────────────────────
const auraSelectiveLines = [
  "Not mass market. We serve specific events — not every party that asks.",
  "Not cheap. Premium is not a price point. It is a standard we never drop.",
  "Not available to everyone. The right event gets Lassi Aura.",
  "Not grab and go. We are not McDonald's. We never will be.",
  "Not just a drink at your event. We are the moment people remember most.",
];

function AuraIsSelective() {
  return (
    <section style={{ background: "#080608", borderTop: "1px solid rgba(245,240,232,0.08)", paddingTop: "100px", paddingBottom: "100px" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 400, fontStyle: "italic", color: "#B5890A", letterSpacing: "0.02em", marginBottom: "48px", lineHeight: 1.2 }}>
          The Aura is selective.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {auraSelectiveLines.map((line, i) => (
            <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontStyle: "italic", fontSize: "0.9rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.8 }}>
              {line}
            </p>
          ))}
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem", fontStyle: "italic", fontWeight: 300, color: "rgba(181,137,10,0.7)", marginTop: "56px", letterSpacing: "0.08em" }}>
          Experience the real aura with Lassi Aura.
        </p>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#080608", borderTop: "1px solid rgba(245,240,232,0.06)", padding: "48px 32px", textAlign: "center" }}>
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, fontSize: "1.1rem", color: "#F5F0E8", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>
        Lassi <span style={{ color: "#B5890A" }}>Aura</span>
      </p>
      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.7rem", color: "rgba(245,240,232,0.25)", letterSpacing: "0.08em", marginBottom: "28px" }}>
        Premium lassi catering · Serving across the state · lassiaura.com
      </p>
      <div className="flex justify-center gap-8">
        {[["#experience","Experience"],["#packages","Packages"],["#engage","Book"]].map(([href,label]) => (
          <a key={href} href={href}
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#B5890A")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.4)")}>
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}

// ── MODAL ─────────────────────────────────────────────────
function Modal({ initial, onClose }: { initial: string; onClose: () => void }) {
  const [pkg, setPkg] = useState(initial);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [form, setForm] = useState({ name: "", email: "", type: "", guests: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const today = new Date(); today.setHours(0,0,0,0);
  const minDate = new Date(today); minDate.setDate(today.getDate() + 14);
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y=>y-1); } else setViewMonth(m=>m-1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y=>y+1); } else setViewMonth(m=>m+1); };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.type || !selectedDate) {
      alert("Please fill in name, email, event type, and select a date."); return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: selectedDate, package: pkg }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { alert(data.error || "Something went wrong."); return; }
      setSubmitted(true);
    } catch { alert("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const labelStyle = { fontFamily: "'Inter', sans-serif" as const, fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(245,240,232,0.5)", marginBottom: "4px" };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(8,6,8,0.92)", paddingTop: "72px" }} onClick={onClose}>
      <div className="w-full max-w-md relative overflow-y-auto"
        style={{ background: "#120D0F", border: "1px solid rgba(245,240,232,0.1)", maxHeight: "calc(100vh - 88px)", padding: "32px" }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose}
          style={{ position: "absolute", top: "16px", right: "16px", width: "28px", height: "28px", background: "transparent", border: "1px solid rgba(245,240,232,0.15)", color: "rgba(245,240,232,0.5)", cursor: "pointer", borderRadius: 0, fontFamily: "'Inter', sans-serif", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
          ×
        </button>

        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)", marginBottom: "8px" }}>
          Book an event
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontStyle: "italic", fontSize: "1.6rem", color: "#F5F0E8", marginBottom: "6px" }}>
          Let&apos;s make it happen
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.8rem", color: "rgba(245,240,232,0.4)", marginBottom: "28px", lineHeight: 1.7 }}>
          Select your package and date — we&apos;ll confirm within 24 hours.
        </p>

        {/* Package selector */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {pkgData.map(p => (
            <button key={p.name} onClick={() => setPkg(p.name)}
              style={{
                border: pkg === p.name ? "1px solid #B5890A" : "1px solid rgba(245,240,232,0.15)",
                background: pkg === p.name ? "#1A1015" : "transparent",
                padding: "12px 8px", textAlign: "center", cursor: "pointer",
                borderRadius: 0, transition: "all 0.2s",
              }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 300, letterSpacing: "0.1em", color: pkg === p.name ? "#B5890A" : "rgba(245,240,232,0.6)", marginBottom: "4px" }}>
                {p.name}
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.9rem", color: pkg === p.name ? "#B5890A" : "rgba(245,240,232,0.4)" }}>
                {p.price}
              </div>
            </button>
          ))}
        </div>

        {/* Calendar */}
        <div style={{ background: "#0D090B", border: "1px solid rgba(245,240,232,0.08)", padding: "16px", marginBottom: "24px" }}>
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} style={{ width: "26px", height: "26px", background: "transparent", border: "1px solid rgba(245,240,232,0.15)", color: "rgba(245,240,232,0.5)", cursor: "pointer", borderRadius: 0, fontSize: "0.9rem" }}>‹</button>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.8rem", letterSpacing: "0.08em", color: "#F5F0E8" }}>{MONTHS[viewMonth]} {viewYear}</span>
            <button onClick={nextMonth} style={{ width: "26px", height: "26px", background: "transparent", border: "1px solid rgba(245,240,232,0.15)", color: "rgba(245,240,232,0.5)", cursor: "pointer", borderRadius: 0, fontSize: "0.9rem" }}>›</button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(d => <div key={d} className="text-center" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.6rem", color: "rgba(245,240,232,0.3)", padding: "3px 0" }}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1 mb-3">
            {Array.from({ length: firstDay }).map((_,i) => <div key={i} />)}
            {Array.from({ length: daysInMonth }).map((_,i) => {
              const day = i + 1;
              const dateObj = new Date(viewYear, viewMonth, day);
              const dateStr = `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
              const disabled = dateObj < minDate;
              const selected = selectedDate === dateStr;
              return (
                <button key={day} disabled={disabled} onClick={() => setSelectedDate(dateStr)}
                  style={{
                    background: selected ? "#B5890A" : "transparent",
                    border: "none", borderRadius: 0,
                    color: disabled ? "rgba(245,240,232,0.2)" : selected ? "#080608" : "rgba(245,240,232,0.6)",
                    fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.75rem",
                    padding: "5px 0", cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { if (!disabled && !selected) e.currentTarget.style.background = "rgba(181,137,10,0.15)"; }}
                  onMouseLeave={e => { if (!disabled && !selected) e.currentTarget.style.background = "transparent"; }}>
                  {day}
                </button>
              );
            })}
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.65rem", color: "rgba(245,240,232,0.25)" }}>
            Next 14 days unavailable.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col"><label style={labelStyle}>Your name</label>
            <input className="input-underline" placeholder="Alex Johnson" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
          <div className="flex flex-col"><label style={labelStyle}>Email</label>
            <input className="input-underline" placeholder="AJ@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col"><label style={labelStyle}>Event type</label>
            <select className="select-underline" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              <option value="">Select</option><option>Wedding</option><option>Corporate event</option><option>House party</option><option>Cultural gathering</option><option>Other</option>
            </select></div>
          <div className="flex flex-col"><label style={labelStyle}>Guests</label>
            <input type="number" min={50} max={10000} className="input-underline" placeholder="Min 50 guests" value={form.guests} onChange={e => setForm({...form, guests: e.target.value})} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: "0.6rem", color: "rgba(245,240,232,0.25)", marginTop: "4px" }}>Min 50 · Max 10,000</span></div>
        </div>
        <div className="flex flex-col mb-6"><label style={labelStyle}>Notes</label>
          <textarea className="input-underline" rows={2} style={{ resize: "none" }}
            placeholder="Location, special requests..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></div>

        {!submitted ? (
          <button onClick={handleSubmit} disabled={loading} className="btn-gold" style={{ width: "100%", padding: "16px 0" }}>
            {loading ? "Sending..." : "Request the Aura"}
          </button>
        ) : (
          <div style={{ border: "1px solid rgba(181,137,10,0.3)", padding: "20px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontSize: "1.1rem", color: "#B5890A" }}>
              Enquiry sent. We&apos;ll confirm within 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────
export default function Home() {
  const [modalPkg, setModalPkg] = useState<string | null>(null);
  const openModal = (pkg: string) => setModalPkg(pkg);
  const closeModal = () => setModalPkg(null);

  return (
    <main style={{ background: "#080608" }}>
      {modalPkg && <Modal initial={modalPkg} onClose={closeModal} />}
      <Navbar onBook={() => openModal("The Experience")} />
      <Hero onBook={() => openModal("The Experience")} />
      <AuraIs />
      <VideoSlider onBook={openModal} />
      <SocialProof />
      <Packages onBook={openModal} />
      <Engagement />
      <AuraIsSelective />
      <Footer />
    </main>
  );
}
