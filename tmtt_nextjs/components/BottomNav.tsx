"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    href: "/#products",
    label: "Buy Now",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
      </svg>
    ),
  },
  {
    href: "/Submit.html",
    label: "Sell",
    icon: null,
    isCenter: true,
  },
  {
    href: "/social",
    label: "Messages",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      </svg>
    ),
    badge: 3,
  },
  {
    href: "/map",
    label: "My Account",
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white px-2 pb-[env(safe-area-inset-bottom)] pt-1 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname?.startsWith(item.href.replace(".html", ""));

          if (item.isCenter) {
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-0.5 py-1 text-slate-400"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path d="M12 5v14m-7-7h14" />
                  </svg>
                </div>
                <span className="text-[10px] font-semibold">{item.label}</span>
              </a>
            );
          }

          const Comp = item.href.includes(".html") ? "a" : Link;

          return (
            <Comp
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center gap-0.5 py-1 transition-colors ${
                isActive ? "text-orange-500" : "text-slate-400"
              }`}
            >
              {item.icon}
              {"badge" in item && item.badge ? (
                <span className="absolute -right-1 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">
                  {item.badge}
                </span>
              ) : null}
              <span className={`text-[10px] ${isActive ? "font-bold" : "font-semibold"}`}>
                {item.label}
              </span>
            </Comp>
          );
        })}
      </div>
    </nav>
  );
}
