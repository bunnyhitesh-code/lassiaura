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
}

export default function AdminTraining() {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Module | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  function load() {
    fetch("/api/admin/training")
      .then((r) => {
        if (r.status === 401) { router.push("/admin/login"); return null; }
        return r.json() as Promise<Module[]>;
      })
      .then((d) => d && setModules(d))
      .finally(() => setLoading(false));
  }

  useEffect(load, [router]);

  function openEdit(m: Module) {
    setEditing({ ...m });
    setSaveError("");
  }

  async function saveEdit() {
    if (!editing) return;
    setSaving(true);
    setSaveError("");
    const { id, ...fields } = editing;
    const res = await fetch(`/api/admin/training/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    if (!res.ok) {
      const d = await res.json() as { error?: string };
      setSaveError(d.error ?? "Save failed");
    } else {
      setEditing(null);
      load();
    }
    setSaving(false);
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <p className="text-[#C4622D] text-[10px] tracking-[0.2em] uppercase mb-1">Manage</p>
        <h1 className="text-[#FAF8F4] text-2xl font-medium">Training Modules</h1>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {modules.map((m) => (
            <div
              key={m.id}
              className="bg-[#1B1008] border border-white/5 rounded-xl p-5 flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <span className="text-[#C4622D] text-sm font-medium w-6 shrink-0 mt-0.5">{m.step_order}</span>
                <div>
                  <p className="text-[#FAF8F4] text-sm font-medium mb-1">{m.title}</p>
                  <div className="flex gap-2">
                    <span className="text-xs bg-white/5 text-white/40 px-2 py-0.5 rounded">{m.type}</span>
                    {m.required === 1 && (
                      <span className="text-xs bg-[#C4622D]/10 text-[#C4622D] px-2 py-0.5 rounded">Required</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => openEdit(m)}
                className="text-xs text-white/30 hover:text-white/70 transition-colors shrink-0"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 py-6">
          <div className="bg-[#1B1008] border border-white/10 rounded-xl w-full max-w-2xl max-h-full flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <h2 className="text-[#FAF8F4] font-medium">Edit module</h2>
              <button
                onClick={() => setEditing(null)}
                className="text-white/30 hover:text-white text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Title</label>
                <input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full bg-[#0F0A05] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C4622D]/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/40 mb-1.5">Step order</label>
                  <input
                    type="number"
                    value={editing.step_order}
                    onChange={(e) => setEditing({ ...editing, step_order: Number(e.target.value) })}
                    className="w-full bg-[#0F0A05] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C4622D]/60"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1.5">Type</label>
                  <select
                    value={editing.type}
                    onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                    className="w-full bg-[#0F0A05] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C4622D]/60"
                  >
                    <option value="checklist">Checklist</option>
                    <option value="video">Video</option>
                    <option value="quiz">Quiz</option>
                    <option value="read">Read</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="required"
                  checked={editing.required === 1}
                  onChange={(e) => setEditing({ ...editing, required: e.target.checked ? 1 : 0 })}
                  className="rounded"
                />
                <label htmlFor="required" className="text-sm text-white/60">Required module</label>
              </div>

              <div>
                <label className="block text-xs text-white/40 mb-1.5">Content</label>
                <textarea
                  value={editing.content}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  rows={12}
                  className="w-full bg-[#0F0A05] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white font-mono leading-relaxed focus:outline-none focus:border-[#C4622D]/60 resize-none"
                />
              </div>

              {saveError && <p className="text-red-400 text-xs">{saveError}</p>}
            </div>

            <div className="px-6 py-4 border-t border-white/5 flex gap-3">
              <button
                onClick={saveEdit}
                disabled={saving}
                className="flex-1 bg-[#C4622D] hover:bg-[#B8561F] text-white rounded-lg py-2.5 text-sm font-medium transition-colors disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
              <button
                onClick={() => setEditing(null)}
                className="flex-1 border border-white/10 text-white/60 hover:text-white rounded-lg py-2.5 text-sm transition-colors"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
