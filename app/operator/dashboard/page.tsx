"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  status: string;
  payout_amount: number | null;
  paid_out: number;
  created_at: string;
  customer_name: string;
  customer_email: string;
  event_type: string;
  package: string;
  date: string;
  guests: number;
  city: string;
  booking_notes: string;
  operator_notes: string | null;
}

const statusStyle: Record<string, { bg: string; text: string; label: string }> = {
  assigned: { bg: "bg-amber-400/10", text: "text-amber-400", label: "New" },
  accepted: { bg: "bg-blue-400/10", text: "text-blue-400", label: "Accepted" },
  declined: { bg: "bg-white/5", text: "text-white/30", label: "Declined" },
  completed: { bg: "bg-green-400/10", text: "text-green-400", label: "Completed" },
};

export default function OperatorDashboard() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Event | null>(null);
  const [declining, setDeclining] = useState(false);
  const [declineReason, setDeclineReason] = useState("");

  function load() {
    fetch("/api/operator/events")
      .then((r) => {
        if (r.status === 401) { router.push("/operator/login"); return null; }
        return r.json() as Promise<Event[]>;
      })
      .then((d) => d && setEvents(d))
      .finally(() => setLoading(false));
  }

  useEffect(load, [router]);

  async function accept(id: string) {
    await fetch(`/api/operator/events/${id}/accept`, { method: "POST" });
    load();
    setSelected(null);
  }

  async function decline(id: string) {
    await fetch(`/api/operator/events/${id}/decline`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason: declineReason }),
    });
    setDeclining(false);
    setDeclineReason("");
    load();
    setSelected(null);
  }

  const pending = events.filter((e) => e.status === "assigned");
  const rest = events.filter((e) => e.status !== "assigned");

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <p className="text-[#C4622D] text-[10px] tracking-[0.2em] uppercase mb-1">Your events</p>
        <h1 className="text-[#FAF8F4] text-xl font-medium">Dashboard</h1>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => <div key={i} className="h-24 bg-[#1B1008] rounded-xl animate-pulse" />)}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-white/20 text-sm">No events yet.</p>
          <p className="text-white/20 text-xs mt-1">Events will appear here once you&apos;re assigned.</p>
        </div>
      ) : (
        <>
          {pending.length > 0 && (
            <div className="mb-6">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-3">
                Action required ({pending.length})
              </p>
              <div className="space-y-3">
                {pending.map((ev) => (
                  <button
                    key={ev.id}
                    onClick={() => setSelected(ev)}
                    className="w-full text-left bg-[#1B1008] border border-amber-400/20 rounded-xl p-4 hover:border-amber-400/40 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-[#FAF8F4] text-sm font-medium">{ev.event_type}</p>
                      <span className="text-[9px] bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded-full">New</span>
                    </div>
                    <p className="text-white/50 text-xs">{ev.date} · {ev.city}</p>
                    <p className="text-white/30 text-xs mt-0.5">{ev.guests} guests{ev.package ? ` · ${ev.package}` : ""}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {rest.length > 0 && (
            <div>
              <p className="text-xs text-white/30 uppercase tracking-wider mb-3">All events</p>
              <div className="space-y-2">
                {rest.map((ev) => {
                  const s = statusStyle[ev.status] ?? statusStyle.assigned;
                  return (
                    <button
                      key={ev.id}
                      onClick={() => setSelected(ev)}
                      className="w-full text-left bg-[#1B1008] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-white/70 text-sm">{ev.event_type}</p>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>{s.label}</span>
                      </div>
                      <p className="text-white/30 text-xs">{ev.date} · {ev.city}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Event detail sheet */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end">
          <div className="bg-[#1B1008] border-t border-white/10 rounded-t-2xl w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1B1008] px-4 pt-4 pb-3 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-[#FAF8F4] font-medium text-sm">{selected.event_type}</h2>
              <button
                onClick={() => { setSelected(null); setDeclining(false); setDeclineReason(""); }}
                className="text-white/30 hover:text-white text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="px-4 py-4 space-y-3">
              {[
                { label: "Date", value: selected.date },
                { label: "City", value: selected.city },
                { label: "Guests", value: String(selected.guests) },
                { label: "Package", value: selected.package || "—" },
                { label: "Status", value: statusStyle[selected.status]?.label ?? selected.status },
                ...(selected.payout_amount != null ? [{ label: "Payout", value: `£${selected.payout_amount.toFixed(2)}` }] : []),
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-white/40">{label}</span>
                  <span className="text-white/70">{value}</span>
                </div>
              ))}

              {selected.booking_notes && (
                <div className="pt-1">
                  <p className="text-xs text-white/30 mb-1">Notes from customer</p>
                  <p className="text-white/50 text-sm">{selected.booking_notes}</p>
                </div>
              )}
            </div>

            {selected.status === "assigned" && (
              <div className="px-4 pb-6 pt-2">
                {declining ? (
                  <div className="space-y-3">
                    <textarea
                      value={declineReason}
                      onChange={(e) => setDeclineReason(e.target.value)}
                      rows={3}
                      className="w-full bg-[#0F0A05] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#C4622D]/60 resize-none"
                      placeholder="Reason for declining (optional)…"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => decline(selected.id)}
                        className="flex-1 border border-red-500/30 text-red-400 rounded-lg py-2.5 text-sm"
                      >
                        Confirm decline
                      </button>
                      <button
                        onClick={() => setDeclining(false)}
                        className="flex-1 border border-white/10 text-white/50 rounded-lg py-2.5 text-sm"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => accept(selected.id)}
                      className="flex-1 bg-[#C4622D] hover:bg-[#B8561F] text-white rounded-xl py-3 text-sm font-medium transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => setDeclining(true)}
                      className="flex-1 border border-white/10 text-white/50 hover:text-white rounded-xl py-3 text-sm transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
