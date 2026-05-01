"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
  {
    href: "/operator/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="7" height="7" rx="1.5" fill="currentColor" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" fill="currentColor" opacity=".5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" fill="currentColor" opacity=".5" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" fill="currentColor" opacity=".5" />
      </svg>
    ),
  },
  {
    href: "/operator/training",
    label: "Training",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M7 8h6M7 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/operator/earnings",
    label: "Earnings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6.5v7M8 8.5c0-.83.67-1.5 2-1.5s2 .67 2 1.5-.67 1.5-2 1.5-2 .67-2 1.5.67 1.5 2 1.5 2-.67 2-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/operator/profile",
    label: "Profile",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 17c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/operator/login") return <>{children}</>;

  async function signOut() {
    await fetch("/api/operator/logout", { method: "POST" });
    router.push("/operator/login");
  }

  return (
    <div className="min-h-screen bg-[#0F0A05] pb-20">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-[#0F0A05]/90 backdrop-blur border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-[#C4622D] text-[9px] tracking-[0.2em] uppercase">Operator</p>
          <p className="text-[#FAF8F4] text-sm font-medium leading-tight">Lassi Aura</p>
        </div>
        <button
          onClick={signOut}
          className="text-white/30 text-xs hover:text-white/60 transition-colors"
        >
          Sign out
        </button>
      </header>

      <div className="min-h-[calc(100vh-8rem)]">{children}</div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0F0A05] border-t border-white/5 flex">
        {nav.map(({ href, label, icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                active ? "text-[#C4622D]" : "text-white/30 hover:text-white/60"
              }`}
            >
              {icon}
              <span className="text-[10px] leading-none">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
