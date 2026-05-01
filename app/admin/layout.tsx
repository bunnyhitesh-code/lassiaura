"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/operators", label: "Operators" },
  { href: "/admin/training", label: "Training" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="flex h-screen bg-[#1B1008] overflow-hidden">
      <aside className="w-56 shrink-0 bg-[#0F0A05] border-r border-white/5 flex flex-col">
        <div className="px-5 py-6 border-b border-white/5">
          <p className="text-[#C4622D] text-[10px] tracking-[0.2em] uppercase font-medium mb-0.5">
            Admin
          </p>
          <p className="text-[#FAF8F4] text-base font-medium tracking-tight">Lassi Aura</p>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          {nav.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2.5 rounded-md text-sm transition-all ${
                  active
                    ? "bg-[#C4622D]/15 text-[#C4622D] font-medium"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/5">
          <button
            onClick={signOut}
            className="w-full text-left px-3 py-2.5 rounded-md text-sm text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
