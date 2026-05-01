"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Stats {
  bookings: { total: number; pending: number; confirmed: number; completed: number };
  operators: { total: number; pending: number; active: number };
  events: { total: number; unpaid_total: number; gross_total: number };
}

function Skeleton() {
  return (
    <div className="p-8">
      <div className="h-6 w-28 bg-white/5 rounded animate-pulse mb-8" />
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-44 bg-white/5 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => {
        if (r.status === 401) { router.push("/admin/login"); return null; }
        return r.json() as Promise<Stats>;
      })
      .then((d) => d && setStats(d))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <Skeleton />;
  if (!stats) return null;

  const fmt = (n: number | null) => (n ?? 0).toFixed(2);

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <p className="text-[#C4622D] text-[10px] tracking-[0.2em] uppercase mb-1">Overview</p>
        <h1 className="text-[#FAF8F4] text-2xl font-medium">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bookings */}
        <div className="bg-[#1B1008] border border-white/5 rounded-xl p-5">
          <p className="text-[#C4622D] text-[10px] tracking-[0.2em] uppercase mb-3">Bookings</p>
          <p className="text-[#FAF8F4] text-4xl font-light mb-5">{stats.bookings.total}</p>
          <div className="space-y-2">
            {[
              { label: "Pending", value: stats.bookings.pending, color: "text-amber-400" },
              { label: "Confirmed", value: stats.bookings.confirmed, color: "text-blue-400" },
              { label: "Completed", value: stats.bookings.completed, color: "text-green-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs text-white/40">{label}</span>
                <span className={`text-xs font-medium ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Operators */}
        <div className="bg-[#1B1008] border border-white/5 rounded-xl p-5">
          <p className="text-[#C4622D] text-[10px] tracking-[0.2em] uppercase mb-3">Operators</p>
          <p className="text-[#FAF8F4] text-4xl font-light mb-5">{stats.operators.total}</p>
          <div className="space-y-2">
            {[
              { label: "Applications", value: stats.operators.pending, color: "text-amber-400" },
              { label: "Active", value: stats.operators.active, color: "text-green-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs text-white/40">{label}</span>
                <span className={`text-xs font-medium ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payouts */}
        <div className="bg-[#1B1008] border border-white/5 rounded-xl p-5">
          <p className="text-[#C4622D] text-[10px] tracking-[0.2em] uppercase mb-3">Payouts</p>
          <p className="text-[#FAF8F4] text-4xl font-light mb-5">£{fmt(stats.events.gross_total)}</p>
          <div className="space-y-2">
            {[
              { label: "Events", value: String(stats.events.total), color: "text-white/70" },
              { label: "Unpaid", value: `£${fmt(stats.events.unpaid_total)}`, color: "text-amber-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs text-white/40">{label}</span>
                <span className={`text-xs font-medium ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
