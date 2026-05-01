"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Operator {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  status: string;
  commission_rate: number;
  total_earnings: number;
  why_join: string;
  joined_at: string;
}

const FILTERS = ["all", "pending", "active", "suspended"] as const;
type Filter = (typeof FILTERS)[number];

const statusStyle: Record<string, string> = {
  pending: "bg-amber-400/10 text-amber-400",
  active: "bg-green-400/10 text-green-400",
  suspended: "bg-white/5 text-white/30",
};

export default function AdminOperators() {
  const router = useRouter();
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [detail, setDetail] = useState<Operator | null>(null);

  const load = useCallback(
    (f: Filter) => {
      setLoading(true);
      const url = f === "all" ? "/api/admin/operators" : `/api/admin/operators?status=${f}`;
      fetch(url)
        .then((r) => {
          if (r.status === 401) { router.push("/admin/login"); return null; }
          return r.json() as Promise<Operator[]>;
        })
        .then((d) => d && setOperators(d))
        .finally(() => setLoading(false));
    },
    [router]
  );

  useEffect(() => { load(filter); }, [filter, load]);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/operators/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (detail?.id === id) setDetail((d) => d && { ...d, status });
    load(filter);
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <p className="text-[#C4622D] text-[10px] tracking-[0.2em] uppercase mb-1">Manage</p>
        <h1 className="text-[#FAF8F4] text-2xl font-medium">Operators</h1>
      </div>

      <div className="flex gap-1 mb-6 bg-[#1B1008] rounded-lg p-1 w-fit border border-white/5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
              filter === f ? "bg-[#C4622D] text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse" />)}
        </div>
      ) : operators.length === 0 ? (
        <p className="text-white/30 text-sm">No operators found.</p>
      ) : (
        <div className="bg-[#1B1008] rounded-xl border border-white/5 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Operator", "Location", "Status", "Commission", "Earnings", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-white/30 font-medium uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {operators.map((op) => (
                <tr
                  key={op.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setDetail(op)}
                      className="text-left"
                    >
                      <p className="text-[#FAF8F4] text-sm hover:text-[#C4622D] transition-colors">{op.name}</p>
                      <p className="text-white/30 text-xs">{op.email}</p>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-white/60 text-sm">{op.city}, {op.state}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyle[op.status] ?? "bg-white/5 text-white/40"}`}>
                      {op.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/60 text-sm">{(op.commission_rate * 100).toFixed(0)}%</td>
                  <td className="px-4 py-3 text-white/60 text-sm">£{(op.total_earnings ?? 0).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {op.status === "pending" && (
                        <button
                          onClick={() => updateStatus(op.id, "active")}
                          className="text-xs text-green-400 hover:text-green-300 transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      {op.status === "active" && (
                        <button
                          onClick={() => updateStatus(op.id, "suspended")}
                          className="text-xs text-white/20 hover:text-red-400 transition-colors"
                        >
                          Suspend
                        </button>
                      )}
                      {op.status === "suspended" && (
                        <button
                          onClick={() => updateStatus(op.id, "active")}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Reinstate
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

      {/* Detail drawer */}
      {detail && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-end z-50">
          <div className="bg-[#1B1008] border-l border-white/10 w-full max-w-sm h-full overflow-y-auto p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[#FAF8F4] font-medium">{detail.name}</p>
                <p className="text-white/40 text-xs">{detail.email}</p>
              </div>
              <button
                onClick={() => setDetail(null)}
                className="text-white/30 hover:text-white text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { label: "Phone", value: detail.phone },
                { label: "City", value: detail.city },
                { label: "State", value: detail.state },
                { label: "Status", value: detail.status },
                { label: "Commission", value: `${(detail.commission_rate * 100).toFixed(0)}%` },
                { label: "Total earnings", value: `£${(detail.total_earnings ?? 0).toFixed(2)}` },
                { label: "Joined", value: detail.joined_at?.slice(0, 10) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-white/40">{label}</span>
                  <span className="text-white/70">{value}</span>
                </div>
              ))}
            </div>

            {detail.why_join && (
              <div className="mb-6">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Why they want to join</p>
                <p className="text-white/60 text-sm leading-relaxed">{detail.why_join}</p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {detail.status === "pending" && (
                <button
                  onClick={() => updateStatus(detail.id, "active")}
                  className="w-full bg-[#C4622D] hover:bg-[#B8561F] text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
                >
                  Approve application
                </button>
              )}
              {detail.status === "active" && (
                <button
                  onClick={() => updateStatus(detail.id, "suspended")}
                  className="w-full border border-red-500/30 text-red-400 hover:bg-red-400/5 rounded-lg py-2.5 text-sm transition-colors"
                >
                  Suspend operator
                </button>
              )}
              {detail.status === "suspended" && (
                <button
                  onClick={() => updateStatus(detail.id, "active")}
                  className="w-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg py-2.5 text-sm transition-colors"
                >
                  Reinstate operator
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
