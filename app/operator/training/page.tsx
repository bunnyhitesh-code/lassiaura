"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Module {
  id: string;
  title: string;
  step_order: number;
  content: string;
  type: string;
  required: number;
  completed: boolean;
  completed_at: string | null;
}

export default function OperatorTraining() {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<Module | null>(null);
  const [completing, setCompleting] = useState(false);

  function load() {
    fetch("/api/operator/training")
      .then((r) => {
        if (r.status === 401) { router.push("/operator/login"); return null; }
        return r.json() as Promise<Module[]>;
      })
      .then((d) => d && setModules(d))
      .finally(() => setLoading(false));
  }

  useEffect(load, [router]);

  async function markComplete(id: string) {
    setCompleting(true);
    await fetch(`/api/operator/training/${id}/complete`, { method: "POST" });
    setCompleting(false);
    load();
    setOpen(null);
  }

  const completed = modules.filter((m) => m.completed).length;
  const total = modules.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <p className="text-[#C4622D] text-[10px] tracking-[0.2em] uppercase mb-1">Learn</p>
        <h1 className="text-[#FAF8F4] text-xl font-medium">Training</h1>
      </div>

      {!loading && total > 0 && (
        <div className="bg-[#1B1008] border border-white/5 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-end mb-2">
            <p className="text-white/50 text-xs">Progress</p>
            <p className="text-[#FAF8F4] text-sm font-medium">{completed}/{total}</p>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C4622D] rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          {pct === 100 && (
            <p className="text-green-400 text-xs mt-2">All modules complete ✓</p>
          )}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => <div key={i} className="h-20 bg-[#1B1008] rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => setOpen(m)}
              className={`w-full text-left rounded-xl p-4 border transition-colors ${
                m.completed
                  ? "bg-[#1B1008] border-white/5 opacity-70"
                  : "bg-[#1B1008] border-[#C4622D]/20 hover:border-[#C4622D]/40"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-medium ${
                  m.completed ? "bg-green-400/20 text-green-400" : "bg-[#C4622D]/20 text-[#C4622D]"
                }`}>
                  {m.completed ? "✓" : m.step_order}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${m.completed ? "text-white/50" : "text-[#FAF8F4]"}`}>
                    {m.title}
                  </p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[10px] text-white/20 capitalize">{m.type}</span>
                    {m.required === 1 && (
                      <span className="text-[10px] text-[#C4622D]/60">Required</span>
                    )}
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/20 shrink-0 mt-1">
                  <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Module reader */}
      {open && (
        <div className="fixed inset-0 bg-[#0F0A05] z-50 overflow-y-auto">
          <div className="sticky top-0 bg-[#0F0A05]/95 backdrop-blur border-b border-white/5 px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[#C4622D] text-[9px] tracking-[0.2em] uppercase">Step {open.step_order}</p>
              <p className="text-[#FAF8F4] text-sm font-medium">{open.title}</p>
            </div>
            <button
              onClick={() => setOpen(null)}
              className="text-white/30 hover:text-white text-lg leading-none"
            >
              ✕
            </button>
          </div>

          <div className="px-4 py-6 max-w-2xl mx-auto">
            <div className="prose prose-sm max-w-none">
              {open.content.split("\n").map((line, i) => {
                if (line.startsWith("**") && line.endsWith("**")) {
                  return <p key={i} className="text-[#FAF8F4] font-semibold mt-5 mb-2 first:mt-0">{line.slice(2, -2)}</p>;
                }
                if (line.startsWith("- [ ]")) {
                  return (
                    <div key={i} className="flex items-start gap-2 py-1">
                      <div className="w-4 h-4 border border-white/20 rounded mt-0.5 shrink-0" />
                      <span className="text-white/60 text-sm">{line.slice(6)}</span>
                    </div>
                  );
                }
                if (line.startsWith("- ")) {
                  return (
                    <div key={i} className="flex items-start gap-2 py-0.5">
                      <span className="text-[#C4622D] mt-1.5 shrink-0">·</span>
                      <span className="text-white/60 text-sm">{line.slice(2)}</span>
                    </div>
                  );
                }
                if (/^\d+\./.test(line)) {
                  return <p key={i} className="text-white/60 text-sm py-0.5 pl-4">{line}</p>;
                }
                if (line.trim() === "") return <div key={i} className="h-2" />;
                return <p key={i} className="text-white/60 text-sm leading-relaxed">{line}</p>;
              })}
            </div>

            <div className="mt-8 pb-4">
              {open.completed ? (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Completed {open.completed_at?.slice(0, 10)}
                </div>
              ) : (
                <button
                  onClick={() => markComplete(open.id)}
                  disabled={completing}
                  className="w-full bg-[#C4622D] hover:bg-[#B8561F] text-white rounded-xl py-3 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {completing ? "Marking complete…" : "Mark as complete"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
