"use client";
import { useEffect, useState } from "react";
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
  joined_at: string;
}

const statusStyle: Record<string, string> = {
  active: "bg-green-400/10 text-green-400",
  pending: "bg-amber-400/10 text-amber-400",
  suspended: "bg-white/5 text-white/30",
};

export default function OperatorProfile() {
  const router = useRouter();
  const [operator, setOperator] = useState<Operator | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    fetch("/api/operator/me")
      .then((r) => {
        if (r.status === 401) { router.push("/operator/login"); return null; }
        return r.json() as Promise<Operator>;
      })
      .then((d) => d && setOperator(d))
      .finally(() => setLoading(false));
  }, [router]);

  async function signOut() {
    setSigningOut(true);
    await fetch("/api/operator/logout", { method: "POST" });
    router.push("/operator/login");
  }

  if (loading) {
    return (
      <div className="px-4 py-6 space-y-4">
        <div className="h-16 w-16 bg-[#1B1008] rounded-full animate-pulse mx-auto" />
        <div className="h-5 w-32 bg-[#1B1008] rounded animate-pulse mx-auto" />
      </div>
    );
  }

  if (!operator) return null;

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <p className="text-[#C4622D] text-[10px] tracking-[0.2em] uppercase mb-1">Account</p>
        <h1 className="text-[#FAF8F4] text-xl font-medium">Profile</h1>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-[#C4622D]/20 flex items-center justify-center mb-3">
          <span className="text-[#C4622D] text-xl font-medium">
            {operator.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <p className="text-[#FAF8F4] font-medium">{operator.name}</p>
        <p className="text-white/40 text-xs mt-0.5">{operator.email}</p>
        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium mt-2 ${statusStyle[operator.status] ?? "bg-white/5 text-white/40"}`}>
          {operator.status}
        </span>
      </div>

      {/* Details */}
      <div className="bg-[#1B1008] border border-white/5 rounded-xl divide-y divide-white/5 mb-4">
        {[
          { label: "Phone", value: operator.phone },
          { label: "City", value: operator.city },
          { label: "Region", value: operator.state },
          { label: "Commission rate", value: `${(operator.commission_rate * 100).toFixed(0)}%` },
          { label: "Total earnings", value: `£${(operator.total_earnings ?? 0).toFixed(2)}` },
          { label: "Joined", value: operator.joined_at?.slice(0, 10) },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between px-4 py-3">
            <span className="text-white/40 text-sm">{label}</span>
            <span className="text-white/70 text-sm">{value || "—"}</span>
          </div>
        ))}
      </div>

      {operator.status === "pending" && (
        <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl px-4 py-3 mb-4">
          <p className="text-amber-400 text-xs font-medium mb-0.5">Application under review</p>
          <p className="text-amber-400/60 text-xs">
            You&apos;ll be notified once your application is approved.
          </p>
        </div>
      )}

      <button
        onClick={signOut}
        disabled={signingOut}
        className="w-full border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 rounded-xl py-3 text-sm transition-colors disabled:opacity-50"
      >
        {signingOut ? "Signing out…" : "Sign out"}
      </button>
    </div>
  );
}
