"use client";

import { useRouter } from "next/navigation";

const pkgData = [
  {
    num: "01", name: "The Order", price: "from $6", unit: "/ glass (400ml)",
    desc: "Fresh, premium lassi delivered ready to serve. You choose the flavours, we handle the rest.",
    features: ["Fresh made to order","Choice of 4 signature flavours","Minimum 20 glasses","Delivered event-ready"],
    featured: false,
  },
  {
    num: "02", name: "The Experience", price: "from $9", unit: "/ glass (400ml)",
    desc: "A live premium booth. We set up, we perform, we pour. Your guests watch the craft happen in real time.",
    features: ["Live booth setup","Artistic pour techniques on display","Premium bar-style presentation","We stay for the full event","All flavours + seasonal specials"],
    featured: true,
  },
  {
    num: "03", name: "The Craft", price: "from $12", unit: "/ glass (400ml)",
    desc: "Fully bespoke. Custom flavours, branded cups, themed booth. Built entirely around your vision.",
    features: ["Everything in The Experience","Custom signature flavour creation","Branded cups & packaging","Themed booth design","Dedicated event coordinator"],
    featured: false,
  },
];

const storyItems = [
  { num: "01", title: "Sourced with intention", desc: "Every ingredient chosen for quality — thick yogurt, real fruit, authentic spices. No shortcuts." },
  { num: "02", title: "Made live, not pre-made", desc: "We make every glass at your event. Fresh, cold, and crafted in front of your guests." },
  { num: "03", title: "The pour is the show", desc: "Our signature high-pour technique creates a visual moment your guests will talk about long after." },
  { num: "04", title: "We stay till the end", desc: "We don't drop and leave. We're there for every guest, every glass, every moment." },
];

export default function HowItWorksPage() {
  const router = useRouter();

  return (
    <main>
      <div className="bg-[#1B2A4A] px-8 py-4 flex items-center gap-4">
        <button onClick={() => router.back()} className="text-white/60 text-sm hover:text-white transition-colors">
          ← Back
        </button>
        <span className="text-white font-medium tracking-widest text-sm">
          LASSI <span className="text-[#C4622D]">AURA</span>
        </span>
      </div>

      <section className="bg-[#1B2A4A] px-8 py-20 text-center">
        <p className="text-[#C4622D] text-xs tracking-[0.18em] uppercase mb-5">The full story</p>
        <h1 className="text-white text-4xl font-medium leading-snug mb-5">
          Not just lassi.<br />An experience worth remembering.
        </h1>
        <p className="text-white/55 text-base leading-relaxed max-w-lg mx-auto">
          From a simple order to a live premium booth — we bring the art of lassi to your event, your way. Every glass crafted with intention.
        </p>
      </section>

      <section className="px-8 py-14 bg-[#F2EEE6]">
        <p className="text-[#C4622D] text-xs tracking-widest uppercase mb-2">Choose your experience</p>
        <h2 className="text-[#0F1A2E] text-2xl font-medium mb-2">Three ways to bring lassi to your event</h2>
        <p className="text-[#5A6A8A] text-sm leading-relaxed mb-8 max-w-lg">
          Whether you need fresh lassi delivered or a full live booth that becomes the centrepiece — we have a package for every occasion.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pkgData.map(p => (
            <div key={p.name} className={`bg-white rounded-xl p-6 relative ${p.featured ? "border-2 border-[#C4622D]" : "border border-[#E8E0D4]"}`}>
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C4622D] text-white text-[11px] px-3 py-0.5 rounded-full whitespace-nowrap">
                  Most popular
                </div>
              )}
              <p className="text-[11px] tracking-widest uppercase text-[#C4622D] mb-2">Package {p.num}</p>
              <h3 className="text-lg font-medium text-[#0F1A2E] mb-2">{p.name}</h3>
              <p className="text-[13px] text-[#5A6A8A] leading-relaxed mb-4">{p.desc}</p>
              <p className="text-xl font-medium text-[#0F1A2E] mb-1">
                {p.price} <span className="text-[13px] font-normal text-[#5A6A8A]">{p.unit}</span>
              </p>
              <ul className="mt-3 mb-5 space-y-2">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-[12px] text-[#5A6A8A] border-b border-[#F0E8E0] pb-2 last:border-0">
                    <span className="w-3 h-3 rounded-full bg-[#FAECE7] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C4622D] block" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push("/#book")}
                className={`w-full py-2.5 rounded-lg text-[13px] font-medium ${p.featured ? "bg-[#C4622D] text-white" : "bg-[#1B2A4A] text-white"}`}>
                Book {p.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 py-14 bg-[#FAF8F4]">
        <p className="text-[#C4622D] text-xs tracking-widest uppercase mb-2">Why Lassi Aura</p>
        <h2 className="text-[#0F1A2E] text-2xl font-medium mb-2">The art behind every glass</h2>
        <p className="text-[#5A6A8A] text-sm leading-relaxed mb-8 max-w-lg">
          Lassi isn&apos;t just a drink. At Lassi Aura it&apos;s a craft — from the way we source our yogurt to the way we pour and present every glass.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {storyItems.map(s => (
            <div key={s.num} className="bg-white border border-[#E4DDD0] rounded-xl p-5">
              <p className="text-3xl font-medium text-[#FAECE7] mb-1">{s.num}</p>
              <p className="text-[14px] font-medium text-[#0F1A2E] mb-2">{s.title}</p>
              <p className="text-[12px] text-[#5A6A8A] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#1B2A4A] px-8 py-8 text-center border-t border-[#2E3F6A]">
        <p className="text-white font-medium tracking-widest text-sm mb-2">
          LASSI <span className="text-[#C4622D]">AURA</span>
        </p>
        <p className="text-white/40 text-xs">Premium lassi catering · Serving across the state · lassiaura.com</p>
      </footer>
    </main>
  );
}