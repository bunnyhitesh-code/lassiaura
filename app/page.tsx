"use client";

import { useState } from "react";

// ── NAVBAR ──────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-[#1B2A4A]">
      <div className="flex items-center gap-3">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="15" fill="#243560" stroke="#B8942A" strokeWidth="0.5"/>
          <path d="M10 20 Q16 10 22 20" stroke="#D4AE4E" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <circle cx="16" cy="12" r="3" fill="#D4AE4E"/>
          <path d="M13 20 Q16 23 19 20" stroke="#D4AE4E" strokeWidth="1" fill="none" strokeLinecap="round"/>
        </svg>
        <span className="text-white font-medium tracking-widest text-base">
          LASSI <span className="text-[#D4AE4E]">AURA</span>
        </span>
      </div>
      <div className="hidden md:flex gap-8 text-sm text-white/55">
        <a href="#menu">Menu</a>
        <a href="#how">How it works</a>
        <a href="#book">Book an event</a>
      </div>
      <button className="bg-[#C4622D] text-white text-sm font-medium px-5 py-2 rounded-lg">
        Get a quote
      </button>
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────
function Hero() {
  return (
    <section className="bg-[#1B2A4A] px-8 py-24 text-center">
      <p className="text-[#D4AE4E] text-xs tracking-[0.18em] uppercase mb-5">
        Premium lassi catering · Statewide service
      </p>
      <h1 className="text-white text-4xl font-medium leading-snug mb-5">
        Crafted lassi,<br />served at your event
      </h1>
      <p className="text-white/55 text-base leading-relaxed max-w-md mx-auto mb-8">
        Authentic, freshly made lassi brought to your gathering. We arrive,
        we serve, and we stay until the very last glass.
      </p>
      <div className="flex gap-3 justify-center flex-wrap mb-6">
        <a href="#book">
          <button className="bg-[#C4622D] text-white px-8 py-3 rounded-lg text-sm font-medium">
            Book your event
          </button>
        </a>
        <a href="#menu">
          <button className="border border-white/30 text-white px-8 py-3 rounded-lg text-sm">
            Explore the menu
          </button>
        </a>
      </div>
      <p className="text-white/35 text-xs">
        Weddings · Corporate events · House parties · Cultural gatherings
      </p>
    </section>
  );
}

// ── MENU ─────────────────────────────────────────────────
const menuItems = [
  { name: "Classic sweet", desc: "Rose water, cardamom, chilled thick yogurt", tag: "Signature" },
  { name: "Mango", desc: "Alphonso mango, saffron, silky yogurt base", tag: "Most popular" },
  { name: "Salted cumin", desc: "Roasted cumin, black salt, palate cleanser", tag: "Traditional" },
  { name: "Custom blend", desc: "We craft a signature flavour just for your event", tag: "Bespoke" },
];

function Menu() {
  return (
    <section id="menu" className="px-8 py-14 bg-[#F2EEE6]">
      <p className="text-[#C4622D] text-xs tracking-widest uppercase mb-2">Our menu</p>
      <h2 className="text-[#0F1A2E] text-2xl font-medium mb-2">Signature lassi selection</h2>
      <p className="text-[#5A6A8A] text-sm leading-relaxed mb-8 max-w-md">
        Made fresh on-site with premium ingredients. Every variety customised to your preference.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {menuItems.map((item) => (
          <div key={item.name} className="bg-white border border-[#E4DDD0] rounded-xl p-5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C4622D] mb-3" />
            <p className="text-[#0F1A2E] text-sm font-medium mb-1">{item.name}</p>
            <p className="text-[#5A6A8A] text-xs leading-relaxed">{item.desc}</p>
            <span className="inline-block mt-3 text-[11px] bg-[#FAECE7] text-[#712B13] px-3 py-0.5 rounded-full">
              {item.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── HOW IT WORKS ─────────────────────────────────────────
const steps = [
  { num: "01", title: "Book your event", desc: "Share your event details, date, and guest count" },
  { num: "02", title: "We plan together", desc: "Confirm menu, quantities, and arrival time" },
  { num: "03", title: "We arrive early", desc: "Our team sets up and is ready before guests" },
  { num: "04", title: "We stay till the end", desc: "Fresh lassi served throughout your entire event" },
];

function HowItWorks() {
  return (
    <section id="how" className="px-8 py-14 bg-[#FAF8F4]">
      <p className="text-[#C4622D] text-xs tracking-widest uppercase mb-2">How it works</p>
      <h2 className="text-[#0F1A2E] text-2xl font-medium mb-2">Simple from start to finish</h2>
      <p className="text-[#5A6A8A] text-sm leading-relaxed mb-8 max-w-md">
        We handle everything. You just show up and enjoy.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((s) => (
          <div key={s.num} className="bg-white border border-[#E4DDD0] rounded-xl p-5">
            <p className="text-[#C4622D] text-xs font-medium tracking-widest mb-2">{s.num}</p>
            <p className="text-[#0F1A2E] text-sm font-medium mb-1">{s.title}</p>
            <p className="text-[#5A6A8A] text-xs leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── BOOKING FORM ─────────────────────────────────────────
function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", type: "", guests: "", notes: "" });

  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  const today = new Date(); today.setHours(0,0,0,0);
  const minDate = new Date(today); minDate.setDate(today.getDate() + 14);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.type || !selectedDate) {
      alert("Please fill in name, email, event type, and select a date.");
      return;
    }

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: selectedDate }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch (err) {
      alert("Network error. Please try again.");
    }
  };

  return (
    <section id="book" className="px-8 py-14 bg-[#F2EEE6]">
      <p className="text-[#C4622D] text-xs tracking-widest uppercase mb-2">Book an event</p>
      <h2 className="text-[#0F1A2E] text-2xl font-medium mb-2">Let&apos;s make it happen</h2>
      <p className="text-[#5A6A8A] text-sm leading-relaxed mb-6 max-w-md">
        Select your event date — we&apos;ll confirm within 24 hours.
      </p>

      <div className="bg-white border border-[#E4DDD0] rounded-xl p-6 max-w-2xl">
        {/* Calendar */}
        <div className="flex justify-between items-center mb-3">
          <button onClick={prevMonth} className="w-8 h-8 border border-[#E4DDD0] rounded-lg text-sm text-[#0F1A2E]">‹</button>
          <span className="text-sm font-medium text-[#0F1A2E]">{MONTHS[viewMonth]} {viewYear}</span>
          <button onClick={nextMonth} className="w-8 h-8 border border-[#E4DDD0] rounded-lg text-sm text-[#0F1A2E]">›</button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAYS.map(d => <div key={d} className="text-center text-[11px] text-[#5A6A8A] py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {Array.from({ length: firstDay }).map((_, i) => <div key={i} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateObj = new Date(viewYear, viewMonth, day);
            const dateStr = `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
            const disabled = dateObj < minDate;
            const selected = selectedDate === dateStr;
            return (
              <button
                key={day}
                disabled={disabled}
                onClick={() => setSelectedDate(dateStr)}
                className={`text-xs py-1.5 rounded-lg border
                  ${disabled ? "text-[#C4BAB0] cursor-not-allowed border-transparent" : ""}
                  ${selected ? "bg-[#C4622D] text-white border-[#C4622D]" : ""}
                  ${!disabled && !selected ? "text-[#0F1A2E] border-transparent hover:bg-[#FAECE7]" : ""}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-[#5A6A8A] mb-4">Dates within the next 14 days are unavailable.</p>

        {/* Form fields */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#5A6A8A]">Your name</label>
            <input className="text-sm px-3 py-2 border border-[#E4DDD0] rounded-lg bg-[#FAF8F4] text-[#0F1A2E]" placeholder="Priya Sharma" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#5A6A8A]">Email address</label>
            <input className="text-sm px-3 py-2 border border-[#E4DDD0] rounded-lg bg-[#FAF8F4] text-[#0F1A2E]" placeholder="priya@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#5A6A8A]">Event type</label>
            <select className="text-sm px-3 py-2 border border-[#E4DDD0] rounded-lg bg-[#FAF8F4] text-[#0F1A2E]" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              <option value="">Select type</option>
              <option>Wedding</option>
              <option>Corporate event</option>
              <option>House party</option>
              <option>Cultural gathering</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#5A6A8A]">Guest count</label>
            <input type="number" className="text-sm px-3 py-2 border border-[#E4DDD0] rounded-lg bg-[#FAF8F4] text-[#0F1A2E]" placeholder="50" value={form.guests} onChange={e => setForm({...form, guests: e.target.value})} />
          </div>
        </div>
        <div className="flex flex-col gap-1 mb-3">
          <label className="text-xs text-[#5A6A8A]">Selected date</label>
          <input disabled className="text-sm px-3 py-2 border border-[#E4DDD0] rounded-lg bg-[#F2EEE6] text-[#A09080]" placeholder="Pick a date above" value={selectedDate ?? ""} />
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label className="text-xs text-[#5A6A8A]">Additional notes</label>
          <textarea className="text-sm px-3 py-2 border border-[#E4DDD0] rounded-lg bg-[#FAF8F4] text-[#0F1A2E] min-h-[80px] resize-y" placeholder="Location, special requests, dietary requirements..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
        </div>

        {!submitted ? (
          <button onClick={handleSubmit} className="w-full bg-[#C4622D] text-white py-3 rounded-lg text-sm font-medium">
            Send booking enquiry
          </button>
        ) : (
          <div className="bg-[#EAF3DE] border border-[#97C459] rounded-lg p-4 text-center text-sm text-[#27500A]">
            Enquiry sent! We&apos;ll confirm your booking within 24 hours.
          </div>
        )}
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#1B2A4A] px-8 py-8 text-center border-t border-[#2E3F6A]">
      <p className="text-white font-medium tracking-widest text-sm mb-2">
        LASSI <span className="text-[#D4AE4E]">AURA</span>
      </p>
      <p className="text-white/40 text-xs">
        Premium lassi catering · Serving across the state · lassiaura.com
      </p>
    </footer>
  );
}

// ── PAGE ─────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Menu />
      <HowItWorks />
      <BookingForm />
      <Footer />
    </main>
  );
}