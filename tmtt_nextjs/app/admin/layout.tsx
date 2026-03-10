import Link from "next/link";
import type { Metadata } from "next";
import { AdminGuard } from "@/components/AdminGuard";

export const metadata: Metadata = {
  title: "Admin Panel | Omenda Pi Pays",
  description: "Admin dashboard for managing services, bookings, and users",
};

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/hotels", label: "Hotels", icon: "🏨" },
  { href: "/admin/properties", label: "Properties", icon: "🏠" },
  { href: "/admin/bills", label: "Bill Payments", icon: "💳" },
  { href: "/admin/orders", label: "Orders", icon: "📦" },
  { href: "/admin/users", label: "Users", icon: "👥" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 flex-shrink-0 overflow-y-auto border-r border-white/[0.06] bg-[#0a0a0c] md:block">
        <div className="p-4">
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-3">
            <span className="text-lg">🛡️</span>
            <div>
              <div className="text-sm font-bold text-violet-400">Admin Panel</div>
              <div className="text-[10px] text-zinc-500">Omenda Pi Pays</div>
            </div>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto border-t border-white/[0.06] p-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-500 transition-colors hover:text-white"
          >
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-[#09090b]/95 backdrop-blur-xl md:hidden">
        <div className="flex overflow-x-auto">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 flex-col items-center gap-1 py-2 text-zinc-400 hover:text-white"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[10px]">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto pb-20 md:pb-0">{children}</main>
    </div>
    </AdminGuard>
  );
}
