"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// ── CONSTANTS ────────────────────────────────────────────
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

// ── NAVBAR ───────────────────────────────────────────────
function Navbar({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 transition-all duration-300 ${scrolled ? "bg-[#0F0A05]/95 backdrop-blur-sm shadow-lg" : "bg-transparent"}`}>
      <div className="flex items-center gap-3">
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="15" fill="#2A1A0A" stroke="#C4622D" strokeWidth="0.5"/>
          <path d="M10 20 Q16 10 22 20" stroke="#C4622D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <circle cx="16" cy="12" r="3" fill="#C4622D"/>
          <path d="M13 20 Q16 23 19 20" stroke="#C4622D" strokeWidth="1" fill="none" strokeLinecap="round"/>
        </svg>
        <span className="text-white font-medium tracking-widest text-sm">LASSI <span className="text-[#C4622D]">AURA</span></span>
      </div>
      <div className="hidden md:flex gap-8 text-xs text-white/50 tracking-widest uppercase">
        <a href="#experience" className="hover:text-white transition-colors">Experience</a>
        <a href="#packages" className="hover:text-white transition-colors">Packages</a>
        <a href="#engage" className="hover:text-white transition-colors">Book</a>
      </div>
      <button onClick={onBook} className="bg-[#C4622D] text-white text-xs font-medium px-5 py-2.5 rounded-lg tracking-wide hover:bg-[#A8501F] transition-colors">
        Get a quote
      </button>
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────
function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "#0F0A05" }}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #C4622D 0%, transparent 70%)" }} />
      </div>

      {/* Animated lassi glass */}
      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 opacity-20 hidden lg:block">
        <HeroGlass />
      </div>

      <div className="relative z-10 text-center px-8 max-w-3xl mx-auto">
        <p className="text-[#C4622D] text-[11px] tracking-[0.25em] uppercase mb-6">Premium lassi catering · Statewide</p>
        <h1 className="text-white font-medium leading-tight mb-6" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
          The art of lassi,<br />live at your event
        </h1>
        <p className="text-white/50 text-base leading-relaxed max-w-xl mx-auto mb-10">
          From a beautifully crafted single glass to a full live premium booth — we bring the culture, craft, and flavour of authentic lassi to your gathering.
        </p>
        <div className="flex gap-3 justify-center flex-wrap mb-8">
          <button onClick={onBook} className="bg-[#C4622D] text-white px-10 py-3.5 rounded-lg text-sm font-medium hover:bg-[#A8501F] transition-colors">
            Book your event
          </button>
          <a href="#experience">
            <button className="border border-white/20 text-white/80 px-10 py-3.5 rounded-lg text-sm hover:border-white/40 transition-colors">
              See how it works
            </button>
          </a>
        </div>
        <p className="text-white/25 text-xs tracking-widest uppercase">Weddings · Corporate · House parties · Cultural gatherings</p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-white text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/40" style={{ animation: "scrollPulse 2s ease-in-out infinite" }} />
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
        @keyframes fillUp {
          0% { height: 0%; }
          100% { height: 72%; }
        }
        @keyframes steamRise {
          0% { opacity: 0; transform: translateY(0) scaleX(1); }
          50% { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-30px) scaleX(1.5); }
        }
        @keyframes dropFall {
          0% { opacity: 0; top: 0px; }
          20% { opacity: 1; }
          100% { opacity: 0; top: 80px; }
        }
        @keyframes glassGlow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(196,98,45,0.3)); }
          50% { filter: drop-shadow(0 0 20px rgba(196,98,45,0.6)); }
        }
      `}</style>
      {/* Glass shape */}
      <svg viewBox="0 0 120 180" className="w-full h-full" style={{ animation: "glassGlow 3s ease-in-out infinite" }}>
        <defs>
          <clipPath id="glassClip">
            <path d="M25 20 L15 160 Q15 170 30 170 L90 170 Q105 170 105 160 L95 20 Z" />
          </clipPath>
        </defs>
        {/* Glass outline */}
        <path d="M25 20 L15 160 Q15 170 30 170 L90 170 Q105 170 105 160 L95 20 Z"
          fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        {/* Liquid fill */}
        <g clipPath="url(#glassClip)">
          <rect x="0" y="50" width="120" height="130"
            fill="rgba(196,98,45,0.7)"
            style={{ animation: "fillUp 3s ease-out forwards" }}
          />
          {/* Foam on top */}
          <ellipse cx="60" cy="50" rx="40" ry="8" fill="rgba(250,236,231,0.9)" />
        </g>
        {/* Pour stream */}
        <path d="M60 0 Q65 10 60 20" stroke="rgba(196,98,45,0.8)" strokeWidth="4" strokeLinecap="round"
          style={{ animation: "dropFall 2s ease-in infinite" }} />
        {/* Glass shine */}
        <path d="M35 30 L30 150" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" />
      </svg>

      {/* Steam particles */}
      {[0,1,2].map(i => (
        <div key={i} className="absolute w-1 h-4 rounded-full bg-white/30"
          style={{
            left: `${35 + i * 15}%`,
            top: "15%",
            animation: `steamRise ${1.5 + i * 0.4}s ease-out infinite`,
            animationDelay: `${i * 0.5}s`
          }} />
      ))}
    </div>
  );
}

// ── VIDEO SLIDER ──────────────────────────────────────────
const slides = [
  {
    id: "pour",
    label: "The Order",
    price: "from $6",
    title: "Crafted with precision",
    sub: "Every glass poured with care. Fresh ingredients, authentic technique.",
    tag: "Single serve · 400ml",
  },
  {
    id: "booth",
    label: "The Experience",
    price: "from $9",
    title: "A live premium booth",
    sub: "We set up, we perform. Your guests watch the art happen in real time.",
    tag: "Live booth · Full event",
  },
  {
    id: "crowd",
    label: "The Craft",
    price: "from $12",
    title: "Built around your vision",
    sub: "Custom flavours, branded setup, dedicated coordinator. Fully bespoke.",
    tag: "Bespoke · Your brand",
  },
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
    <section id="experience" className="bg-[#0F0A05] py-24 px-8">
      <p className="text-[#C4622D] text-[11px] tracking-[0.2em] uppercase mb-3 text-center">The experience</p>
      <h2 className="text-white text-3xl font-medium text-center mb-16">Three ways to experience Lassi Aura</h2>

      <div className="max-w-5xl mx-auto">
        {/* Slide display */}
        <div className="relative rounded-2xl overflow-hidden mb-6" style={{ height: "420px", isolation: "isolate" }}>
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
              {/* Overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,10,5,0.85) 0%, rgba(15,10,5,0.3) 50%, transparent 100%)" }} />
              <div className="absolute bottom-8 left-0 right-0 px-10">
                <span className="inline-block text-[11px] tracking-widest uppercase text-[#C4622D] bg-[#C4622D]/10 border border-[#C4622D]/30 px-3 py-1 rounded-full mb-3">
                  {s.tag}
                </span>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-white text-2xl font-medium mb-1">{s.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{s.sub}</p>
                  </div>
                  <button onClick={() => onBook(s.label)}
                    className="flex-shrink-0 bg-[#C4622D] text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-[#A8501F] transition-colors">
                    Book {s.label}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide tabs */}
        <div className="grid grid-cols-3 gap-3">
          {slides.map((s, i) => (
            <button key={s.id} onClick={() => setActive(i)}
              className={`p-4 rounded-xl border text-left transition-all ${active === i ? "border-[#C4622D] bg-[#C4622D]/10" : "border-white/10 bg-white/5 hover:border-white/20"}`}>
              <div className="text-[11px] tracking-widest uppercase text-[#C4622D] mb-1">{s.label}</div>
              <div className="text-white text-sm font-medium">{s.price} / glass</div>
              {/* Progress bar */}
              {active === i && (
                <div className="mt-3 h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#C4622D] rounded-full" style={{ animation: `progress ${duration}s linear forwards` }} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
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
    <div className="absolute inset-0 w-full h-full">
      <video
        ref={setRef}
        autoPlay
        muted
        playsInline
        onEnded={onEnded}
        onLoadedMetadata={onLoadedMetadata}
        className="absolute inset-0 w-full h-full object-cover"
        src="/order.mp4"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,10,5,0.75) 35%, rgba(15,10,5,0.2) 70%, transparent 100%)" }} />
    </div>
  );
}

function BoothVideo({ setRef, onEnded, onLoadedMetadata }: VideoSlideProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <video
        ref={setRef}
        autoPlay
        muted
        playsInline
        onEnded={onEnded}
        onLoadedMetadata={onLoadedMetadata}
        className="absolute inset-0 w-full h-full object-cover"
        src="/booth.mp4"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,10,5,0.75) 35%, rgba(15,10,5,0.2) 70%, transparent 100%)" }} />
    </div>
  );
}

function CrowdVideo({ setRef, onEnded, onLoadedMetadata }: VideoSlideProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <video
        ref={setRef}
        autoPlay
        muted
        playsInline
        onEnded={onEnded}
        onLoadedMetadata={onLoadedMetadata}
        className="absolute inset-0 w-full h-full object-cover"
        src="/craft.mp4"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,10,5,0.75) 35%, rgba(15,10,5,0.2) 70%, transparent 100%)" }} />
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
    <section className="py-20 px-8 bg-[#FAF8F4]">
      <p className="text-[#C4622D] text-[11px] tracking-[0.2em] uppercase mb-3 text-center">What people say</p>
      <h2 className="text-[#0F1A2E] text-3xl font-medium text-center mb-12">Guests remember Lassi Aura</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white border border-[#E8E0D4] rounded-xl p-6">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, s) => (
                <span key={s} className="text-[#C4622D] text-sm">★</span>
              ))}
            </div>
            <p className="text-[#1B1008] text-sm leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
            <div>
              <p className="text-[#1B1008] text-sm font-medium">{t.name}</p>
              <p className="text-[#8B7355] text-xs mt-0.5">{t.event}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Trust badges */}
      <div className="flex flex-wrap justify-center gap-6 mt-12">
        {["Statewide service","Premium ingredients","Live at your event","24hr confirmation"].map(b => (
          <div key={b} className="flex items-center gap-2 text-[#6B5C50] text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4622D]" />
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
    num: "02", name: "The Experience", price: "from $9", unit: "/ glass (400ml)", featured: true,
    desc: "Live premium booth. We set up, we perform, we pour. Guests watch the craft in real time.",
    features: ["Full live booth setup","Artistic pour techniques","Premium bar-style presentation","We stay the full event"],
  },
  {
    num: "03", name: "The Craft", price: "from $12", unit: "/ glass (400ml)", featured: false,
    desc: "Fully bespoke. Custom flavours, branded cups, themed booth. Built around your vision.",
    features: ["Everything in The Experience","Custom signature flavour","Branded cups & packaging","Dedicated coordinator"],
  },
];

function Packages({ onBook }: { onBook: (pkg: string) => void }) {
  return (
    <section id="packages" className="py-20 px-8 bg-[#F2EEE6]">
      <p className="text-[#C4622D] text-[11px] tracking-[0.2em] uppercase mb-3 text-center">Our packages</p>
      <h2 className="text-[#0F1A2E] text-3xl font-medium text-center mb-4">Choose your experience</h2>
      <p className="text-[#6B5C50] text-sm text-center max-w-lg mx-auto mb-12 leading-relaxed">
        Three packages built for different occasions. All include fresh ingredients, authentic technique, and our commitment to making your event memorable.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {pkgData.map(p => (
          <div key={p.name} className={`bg-white rounded-2xl p-6 relative ${p.featured ? "border-2 border-[#C4622D] shadow-lg" : "border border-[#E8E0D4]"}`}>
            {p.featured && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C4622D] text-white text-[11px] px-4 py-1 rounded-full whitespace-nowrap tracking-wide">
                Most popular
              </div>
            )}
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#C4622D] mb-2">Package {p.num}</p>
            <h3 className="text-xl font-medium text-[#1B1008] mb-2">{p.name}</h3>
            <p className="text-[13px] text-[#6B5C50] leading-relaxed mb-4">{p.desc}</p>
            <p className="text-2xl font-medium text-[#1B1008] mb-4">{p.price} <span className="text-sm font-normal text-[#6B5C50]">{p.unit}</span></p>
            <ul className="space-y-2.5 mb-6">
              {p.features.map(f => (
                <li key={f} className="flex items-center gap-2.5 text-[13px] text-[#6B5C50]">
                  <span className="w-4 h-4 rounded-full bg-[#FAECE7] flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C4622D] block" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <button onClick={() => onBook(p.name)}
              className={`w-full py-3 rounded-xl text-sm font-medium transition-colors ${p.featured ? "bg-[#C4622D] text-white hover:bg-[#A8501F]" : "bg-[#1B1008] text-white hover:bg-[#2D1A08]"}`}>
              Book {p.name}
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
  const [form, setForm] = useState({ name: "", email: "", type: "", guests: "", notes: "" });

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

  return (
    <section id="engage" className="py-20 px-8 bg-[#0F0A05]">
      <p className="text-[#C4622D] text-[11px] tracking-[0.2em] uppercase mb-3 text-center">Get in touch</p>
      <h2 className="text-white text-3xl font-medium text-center mb-4">Let&apos;s make it happen</h2>
      <p className="text-white/40 text-sm text-center max-w-md mx-auto mb-10">
        Ready to book, want a quote, or just curious? We respond within 24 hours.
      </p>

      <div className="max-w-xl mx-auto">
        {/* Tabs */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-6">
          {tabs.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setSubmitted(false); }}
              className={`flex-1 py-2.5 text-sm rounded-lg transition-all ${tab === t.id ? "bg-[#C4622D] text-white font-medium" : "text-white/50 hover:text-white/80"}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-[#C4622D]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-[#C4622D] text-xl">✓</span>
              </div>
              <p className="text-white font-medium mb-2">We&apos;ve got your message!</p>
              <p className="text-white/50 text-sm">We&apos;ll be in touch within 24 hours.</p>
            </div>
          ) : (
            <>
              {/* Book tab — with calendar */}
              {tab === "book" && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <button onClick={prevMonth} className="w-8 h-8 border border-white/10 rounded-lg text-sm text-white/60 hover:border-white/30">‹</button>
                    <span className="text-white text-sm font-medium">{MONTHS[viewMonth]} {viewYear}</span>
                    <button onClick={nextMonth} className="w-8 h-8 border border-white/10 rounded-lg text-sm text-white/60 hover:border-white/30">›</button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {DAYS.map(d => <div key={d} className="text-center text-[10px] text-white/30 py-1">{d}</div>)}
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
                          className={`text-[12px] py-1.5 rounded-lg border transition-all
                            ${disabled ? "text-white/15 cursor-not-allowed border-transparent" : ""}
                            ${selected ? "bg-[#C4622D] text-white border-[#C4622D]" : ""}
                            ${!disabled && !selected ? "text-white/60 border-transparent hover:bg-white/10" : ""}
                          `}>
                          {day}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-white/25 mb-4">Dates within the next 14 days are unavailable.</p>
                </div>
              )}

              {/* Common fields */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-white/40">Your name</label>
                  <input className="text-sm px-3 py-2.5 border border-white/10 rounded-lg bg-white/5 text-white placeholder-white/20 focus:border-[#C4622D] outline-none transition-colors"
                    placeholder="Alex Johnson" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-white/40">Email address</label>
                  <input className="text-sm px-3 py-2.5 border border-white/10 rounded-lg bg-white/5 text-white placeholder-white/20 focus:border-[#C4622D] outline-none transition-colors"
                    placeholder="AJ@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
              </div>

              {tab !== "hello" && (
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-white/40">Event type</label>
                    <select className="text-sm px-3 py-2.5 border border-white/10 rounded-lg bg-[#1A1008] text-white focus:border-[#C4622D] outline-none transition-colors"
                      value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                      <option value="">Select</option>
                      <option>Wedding</option>
                      <option>Corporate event</option>
                      <option>House party</option>
                      <option>Cultural gathering</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-white/40">Guest count</label>
                    <input type="number" className="text-sm px-3 py-2.5 border border-white/10 rounded-lg bg-white/5 text-white placeholder-white/20 focus:border-[#C4622D] outline-none transition-colors"
                      placeholder="50" value={form.guests} onChange={e => setForm({...form, guests: e.target.value})} />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-[11px] text-white/40">
                  {tab === "hello" ? "Your message" : "Additional notes"}
                </label>
                <textarea className="text-sm px-3 py-2.5 border border-white/10 rounded-lg bg-white/5 text-white placeholder-white/20 focus:border-[#C4622D] outline-none transition-colors resize-none"
                  rows={3} placeholder={tab === "hello" ? "What's on your mind?" : "Location, special requests, dietary requirements..."}
                  value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
              </div>

              <button onClick={handleSubmit} disabled={loading}
                className="w-full bg-[#C4622D] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#A8501F] transition-colors disabled:opacity-60">
                {loading ? "Sending..." : tab === "book" ? "Send booking enquiry" : tab === "quote" ? "Request a quote" : "Send message"}
              </button>
            </>
          )}
        </div>

        {/* Direct contact */}
        <div className="flex justify-center gap-6 mt-6">
          <a href="mailto:hello@lassiaura.com" className="text-white/30 text-xs hover:text-white/60 transition-colors">
            hello@lassiaura.com
          </a>
          <span className="text-white/10">|</span>
          <a href="https://wa.me/1234567890" className="text-white/30 text-xs hover:text-white/60 transition-colors">
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0A0603] px-8 py-10 text-center border-t border-white/5">
      <p className="text-white font-medium tracking-widest text-sm mb-2">
        LASSI <span className="text-[#C4622D]">AURA</span>
      </p>
      <p className="text-white/25 text-xs mb-6">Premium lassi catering · Serving across the state · lassiaura.com</p>
      <div className="flex justify-center gap-6 text-white/20 text-xs">
        <a href="#experience" className="hover:text-white/50 transition-colors">Experience</a>
        <a href="#packages" className="hover:text-white/50 transition-colors">Packages</a>
        <a href="#engage" className="hover:text-white/50 transition-colors">Book</a>
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,10,5,0.9)" }} onClick={onClose}>
      <div className="bg-[#FAF8F4] rounded-2xl p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 border border-[#E8E0D4] rounded-lg text-sm text-[#6B5C50] hover:bg-[#F2EEE6]">×</button>

        <p className="text-[11px] tracking-[0.15em] uppercase text-[#C4622D] mb-1">Book an event</p>
        <h2 className="text-xl font-medium text-[#1B1008] mb-1">Let&apos;s make it happen</h2>
        <p className="text-[13px] text-[#6B5C50] mb-5 leading-relaxed">Select your package and date — we&apos;ll confirm within 24 hours.</p>

        {/* Package selector */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {pkgData.map(p => (
            <button key={p.name} onClick={() => setPkg(p.name)}
              className={`border rounded-xl p-2.5 text-center transition-all ${pkg === p.name ? "border-[#C4622D] bg-[#FAECE7]" : "border-[#E8E0D4] bg-white hover:border-[#C4622D]/50"}`}>
              <div className="text-[11px] font-medium text-[#1B1008]">{p.name}</div>
              <div className="text-[11px] text-[#6B5C50] mt-0.5">{p.price}</div>
            </button>
          ))}
        </div>

        {/* Calendar */}
        <div className="flex justify-between items-center mb-2">
          <button onClick={prevMonth} className="w-7 h-7 border border-[#E8E0D4] rounded-lg text-sm text-[#1B1008]">‹</button>
          <span className="text-sm font-medium text-[#1B1008]">{MONTHS[viewMonth]} {viewYear}</span>
          <button onClick={nextMonth} className="w-7 h-7 border border-[#E8E0D4] rounded-lg text-sm text-[#1B1008]">›</button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAYS.map(d => <div key={d} className="text-center text-[10px] text-[#6B5C50] py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {Array.from({ length: firstDay }).map((_,i) => <div key={i} />)}
          {Array.from({ length: daysInMonth }).map((_,i) => {
            const day = i + 1;
            const dateObj = new Date(viewYear, viewMonth, day);
            const dateStr = `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
            const disabled = dateObj < minDate;
            const selected = selectedDate === dateStr;
            return (
              <button key={day} disabled={disabled} onClick={() => setSelectedDate(dateStr)}
                className={`text-[12px] py-1.5 rounded-lg border transition-all
                  ${disabled ? "text-[#C4BAB0] cursor-not-allowed border-transparent" : ""}
                  ${selected ? "bg-[#C4622D] text-white border-[#C4622D]" : ""}
                  ${!disabled && !selected ? "text-[#1B1008] border-transparent hover:bg-[#FAECE7]" : ""}
                `}>
                {day}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-[#6B5C50] mb-4">Next 14 days unavailable.</p>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="flex flex-col gap-1"><label className="text-[11px] text-[#6B5C50]">Your name</label>
            <input className="text-sm px-3 py-2 border border-[#E8E0D4] rounded-lg bg-white text-[#1B1008]" placeholder="Alex Johnson" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
          <div className="flex flex-col gap-1"><label className="text-[11px] text-[#6B5C50]">Email</label>
            <input className="text-sm px-3 py-2 border border-[#E8E0D4] rounded-lg bg-white text-[#1B1008]" placeholder="AJ@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="flex flex-col gap-1"><label className="text-[11px] text-[#6B5C50]">Event type</label>
            <select className="text-sm px-3 py-2 border border-[#E8E0D4] rounded-lg bg-white text-[#1B1008]" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              <option value="">Select</option><option>Wedding</option><option>Corporate event</option><option>House party</option><option>Cultural gathering</option><option>Other</option>
            </select></div>
          <div className="flex flex-col gap-1"><label className="text-[11px] text-[#6B5C50]">Guests</label>
            <input type="number" className="text-sm px-3 py-2 border border-[#E8E0D4] rounded-lg bg-white text-[#1B1008]" placeholder="50" value={form.guests} onChange={e => setForm({...form, guests: e.target.value})} /></div>
        </div>
        <div className="flex flex-col gap-1 mb-4"><label className="text-[11px] text-[#6B5C50]">Notes</label>
          <textarea className="text-sm px-3 py-2 border border-[#E8E0D4] rounded-lg bg-white text-[#1B1008] resize-none" rows={2}
            placeholder="Location, special requests..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} /></div>

        {!submitted ? (
          <button onClick={handleSubmit} disabled={loading}
            className="w-full bg-[#C4622D] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#A8501F] transition-colors disabled:opacity-60">
            {loading ? "Sending..." : "Send booking enquiry"}
          </button>
        ) : (
          <div className="bg-[#EAF3DE] border border-[#97C459] rounded-xl p-4 text-center text-sm text-[#27500A]">
            Enquiry sent! We&apos;ll confirm within 24 hours.
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
    <main className="bg-[#0F0A05]">
      {modalPkg && <Modal initial={modalPkg} onClose={closeModal} />}
      <Navbar onBook={() => openModal("The Experience")} />
      <Hero onBook={() => openModal("The Experience")} />
      <VideoSlider onBook={openModal} />
      <SocialProof />
      <Packages onBook={openModal} />
      <Engagement />
      <Footer />
    </main>
  );
}