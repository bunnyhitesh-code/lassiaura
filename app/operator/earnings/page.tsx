"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Summary {
  total_earned: number | null;
  total_paid: number | null;
  total_pending: number | null;
}

interface EarningEvent {
  id: string;
  status: string;
  payout_amount: number;
  paid_out: number;
  created_at: string;
  event_type: string;
  package: string;
  date: string;
  city: string;
}

interface EarningsData {
  summary: Summary;
  events: EarningEvent[];
}

const eventStatusStyle: Record<string, string> = {
  accepted: "text-blue-400",
  completed: "text-green-400",
  declined: "text-white/30",
  assigned: "text-amber-400",
};

export default function OperatorEarnings() {
  const router = useRouter();
  const [data, setData] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/operator/earnings")
      .then((r) => {
        if (r.status === 401) { router.push("/operator/login"); return null; }
        return r.json() as Promise<EarningsData>;
      })
      .then((d) => d && setData(d))
      .finally(() => setLoading(false));
  }, [router]);

  const fmt = (n: number | null) => `£${(n ?? 0).toFixed(2)}`;

  if (loading) {
    return (
      <div className="px-4 py-6 space-y-4">
        <div className="h-6 w-24 bg-[#1B1008] rounded animate-pulse" />
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => <div key={i} className="h-24 bg-[#1B1008] rounded-xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  const { summary, events } = data ?? { summary: { total_earned: null, total_paid: null, total_pending: null }, events: [] };

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <p className="text-[#C4622D] text-[10px] tracking-[0.2em] uppercase mb-1">Finances</p>
        <h1 className="text-[#FAF8F4] text-xl font-medium">Earnings</h1>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total earned", value: fmt(summary.total_earned), color: "text-[#FAF8F4]" },
          { label: "Paid out", value: fmt(summary.total_paid), color: "text-green-400" },
          { label: "Pending", value: fmt(summary.total_pending), color: "text-amber-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-[#1B1008] border border-white/5 rounded-xl p-3">
            <p className="text-white/30 text-[10px] mb-2 leading-tight">{label}</p>
            <p className={`text-base font-medium ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Events list */}
      <div>
        <p className="text-xs text-white/30 uppercase tracking-wider mb-3">Event history</p>
        {events.length === 0 ? (
          <p className="text-white/20 text-sm text-center py-12">No earnings recorded yet.</p>
        ) : (
          <div className="space-y-2">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-[#1B1008] border border-white/5 rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-white/70 text-sm">{ev.event_type}</p>
                  <p className="text-white/30 text-xs mt-0.5">{ev.date} · {ev.city}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] capitalize ${eventStatusStyle[ev.status] ?? "text-white/30"}`}>
                      {ev.status}
                    </span>
                    {ev.paid_out === 1 && (
                      <span className="text-[10px] text-green-400">· Paid</span>
                    )}
                  </div>
                </div>
                <p className={`text-sm font-medium ${ev.paid_out === 1 ? "text-green-400" : "text-[#FAF8F4]"}`}>
                  £{ev.payout_amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
