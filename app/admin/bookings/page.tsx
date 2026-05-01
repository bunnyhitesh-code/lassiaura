"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  name: string;
  email: string;
  event_type: string;
  package: string;
  date: string;
  guests: number;
  city: string;
  notes: string;
  status: string;
  operator_id: string | null;
  created_at: string;
}

interface Operator {
  id: string;
  name: string;
  city: string;
}

const STATUSES = ["all", "pending", "confirmed", "completed", "cancelled"] as const;
type Filter = (typeof STATUSES)[number];

const statusColor: Record<string, string> = {
  pending: "bg-amber-400/10 text-amber-400",
  confirmed: "bg-blue-400/10 text-blue-400",
  completed: "bg-green-400/10 text-green-400",
  cancelled: "bg-white/5 text-white/30",
};

export default function AdminBookings() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");

  const [assignModal, setAssignModal] = useState<{ open: boolean; booking: Booking | null }>({
    open: false,
    booking: null,
  });
  const [operators, setOperators] = useState<Operator[]>([]);
  const [selectedOp, setSelectedOp] = useState("");
  const [payout, setPayout] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [assignError, setAssignError] = useState("");

  const load = useCallback(
    (f: Filter) => {
      setLoading(true);
      const url = f === "all" ? "/api/admin/bookings" : `/api/admin/bookings?status=${f}`;
      fetch(url)
        .then((r) => {
          if (r.status === 401) { router.push("/admin/login"); return null; }
          return r.json() as Promise<Booking[]>;
        })
        .then((d) => d && setBookings(d))
        .finally(() => setLoading(false));
    },
    [router]
  );

  useEffect(() => { load(filter); }, [filter, load]);

  async function openAssign(booking: Booking) {
    setAssignModal({ open: true, booking });
    setSelectedOp("");
    setPayout("");
    setAssignError("");
    if (operators.length === 0) {
      const d = await fetch("/api/admin/operators?status=active").then((r) => r.json()) as Operator[];
      setOperators(d);
    }
  }

  async function submitAssign() {
    if (!assignModal.booking || !selectedOp) return;
    setAssigning(true);
    setAssignError("");
    const res = await fetch(`/api/admin/bookings/${assignModal.booking.id}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ operator_id: selectedOp, payout_amount: payout ? Number(payout) : null }),
    });
    if (!res.ok) {
      const d = await res.json() as { error?: string };
      setAssignError(d.error ?? "Failed");
    } else {
      setAssignModal({ open: false, booking: null });
      load(filter);
    }
    setAssigning(false);
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/bookings/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load(filter);
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <p className="text-[#C4622D] text-[10px] tracking-[0.2em] uppercase mb-1">Manage</p>
        <h1 className="text-[#FAF8F4] text-2xl font-medium">Bookings</h1>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 bg-[#1B1008] rounded-lg p-1 w-fit border border-white/5">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
              filter === s
                ? "bg-[#C4622D] text-white"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-14 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-white/30 text-sm">No bookings found.</p>
      ) : (
        <div className="bg-[#1B1008] rounded-xl border border-white/5 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Customer", "Event", "Date", "City", "Guests", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-white/30 font-medium uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-[#FAF8F4] text-sm">{b.name}</p>
                    <p className="text-white/30 text-xs">{b.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-white/70 text-sm">{b.event_type}</p>
                    {b.package && <p className="text-white/30 text-xs">{b.package}</p>}
                  </td>
                  <td className="px-4 py-3 text-white/60 text-sm whitespace-nowrap">{b.date}</td>
                  <td className="px-4 py-3 text-white/60 text-sm">{b.city}</td>
                  <td className="px-4 py-3 text-white/60 text-sm">{b.guests}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[b.status] ?? "bg-white/5 text-white/50"}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {b.status === "pending" && (
                        <button
                          onClick={() => openAssign(b)}
                          className="text-xs text-[#C4622D] hover:text-[#E07040] transition-colors"
                        >
                          Assign
                        </button>
                      )}
                      {b.status === "confirmed" && (
                        <button
                          onClick={() => updateStatus(b.id, "completed")}
                          className="text-xs text-green-400 hover:text-green-300 transition-colors"
                        >
                          Complete
                        </button>
                      )}
                      {b.status !== "cancelled" && b.status !== "completed" && (
                        <button
                          onClick={() => updateStatus(b.id, "cancelled")}
                          className="text-xs text-white/20 hover:text-red-400 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Assign modal */}
      {assignModal.open && assignModal.booking && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-[#1B1008] border border-white/10 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-[#FAF8F4] font-medium mb-1">Assign operator</h2>
            <p className="text-white/40 text-xs mb-5">
              Booking for {assignModal.booking.name} — {assignModal.booking.event_type}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/40 mb-1.5">Operator</label>
                <select
                  value={selectedOp}
                  onChange={(e) => setSelectedOp(e.target.value)}
                  className="w-full bg-[#0F0A05] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C4622D]/60"
                >
                  <option value="">Select an operator…</option>
                  {operators.map((op) => (
                    <option key={op.id} value={op.id}>
                      {op.name} — {op.city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-white/40 mb-1.5">Payout amount (£)</label>
                <input
                  type="number"
                  value={payout}
                  onChange={(e) => setPayout(e.target.value)}
                  min="0"
                  step="0.01"
                  className="w-full bg-[#0F0A05] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C4622D]/60"
                  placeholder="0.00"
                />
              </div>

              {assignError && <p className="text-red-400 text-xs">{assignError}</p>}

              <div className="flex gap-3 pt-1">
                <button
                  onClick={submitAssign}
                  disabled={!selectedOp || assigning}
                  className="flex-1 bg-[#C4622D] hover:bg-[#B8561F] text-white rounded-lg py-2.5 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {assigning ? "Assigning…" : "Assign"}
                </button>
                <button
                  onClick={() => setAssignModal({ open: false, booking: null })}
                  className="flex-1 border border-white/10 text-white/60 hover:text-white rounded-lg py-2.5 text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
