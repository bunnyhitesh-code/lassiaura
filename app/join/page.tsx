"use client";
import Link from "next/link";
import { useState } from "react";

interface Form {
  name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  state: string;
  why_join: string;
}

const INITIAL: Form = { name: "", email: "", password: "", phone: "", city: "", state: "", why_join: "" };

export default function JoinPage() {
  const [form, setForm] = useState<Form>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function set(key: keyof Form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/operator/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json() as { error?: string };
        setError(d.error ?? "Something went wrong.");
        return;
      }
      setDone(true);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#0F0A05] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-[#C4622D]/20 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#C4622D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[#C4622D] text-[10px] tracking-[0.2em] uppercase mb-3">Application received</p>
          <h1 className="text-[#FAF8F4] text-2xl font-medium mb-4">Thank you, {form.name.split(" ")[0]}</h1>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Your application is under review. We&apos;ll get back to you within 2–3 business days.
          </p>
          <Link
            href="/operator/login"
            className="text-sm text-[#C4622D] hover:underline"
          >
            Go to operator login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0A05] px-4 py-12">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-white/30 text-xs hover:text-white/60 transition-colors mb-6 block">
            ← Back to Lassi Aura
          </Link>
          <p className="text-[#C4622D] text-[10px] tracking-[0.2em] uppercase mb-2">Join the team</p>
          <h1 className="text-[#FAF8F4] text-3xl font-medium mb-2">Become an operator</h1>
          <p className="text-white/40 text-sm">
            Run your own Lassi Aura station at events. We provide the brand, recipes, and bookings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Full name</label>
              <input
                type="text"
                value={form.name}
                onChange={set("name")}
                required
                className="w-full bg-[#1B1008] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C4622D]/60 transition-colors"
                placeholder="Priya Sharma"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                required
                className="w-full bg-[#1B1008] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C4622D]/60 transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/40 mb-1.5">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={set("password")}
              required
              minLength={8}
              className="w-full bg-[#1B1008] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C4622D]/60 transition-colors"
              placeholder="Min. 8 characters"
            />
          </div>

          <div>
            <label className="block text-xs text-white/40 mb-1.5">Phone number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={set("phone")}
              required
              className="w-full bg-[#1B1008] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C4622D]/60 transition-colors"
              placeholder="+44 7700 000000"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/40 mb-1.5">City</label>
              <input
                type="text"
                value={form.city}
                onChange={set("city")}
                required
                className="w-full bg-[#1B1008] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C4622D]/60 transition-colors"
                placeholder="London"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5">County / Region</label>
              <input
                type="text"
                value={form.state}
                onChange={set("state")}
                required
                className="w-full bg-[#1B1008] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C4622D]/60 transition-colors"
                placeholder="Greater London"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/40 mb-1.5">
              Why do you want to join Lassi Aura?
            </label>
            <textarea
              value={form.why_join}
              onChange={set("why_join")}
              rows={4}
              className="w-full bg-[#1B1008] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C4622D]/60 transition-colors resize-none"
              placeholder="Tell us a bit about yourself and your interest in Lassi Aura…"
            />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C4622D] hover:bg-[#B8561F] text-white rounded-lg py-3 text-sm font-medium transition-colors disabled:opacity-50"
          >
            {loading ? "Submitting…" : "Submit application"}
          </button>

          <p className="text-center text-white/30 text-xs">
            Already have an account?{" "}
            <Link href="/operator/login" className="text-[#C4622D] hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
