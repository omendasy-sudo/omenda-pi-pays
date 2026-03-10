"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function Home() {
  const { t } = useTranslation();

  const services = [
    { icon: "🏨", title: t("services.rentHotel"), desc: t("services.rentHotelDesc"), href: "/services/hotels", color: "violet" },
    { icon: "🏠", title: t("services.buyHome"), desc: t("services.buyHomeDesc"), href: "/services/homes", color: "amber" },
    { icon: "💳", title: t("services.payBills"), desc: t("services.payBillsDesc"), href: "/services/bills", color: "emerald" },
  ];

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-amber-900/10" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
            {t("hero.badge")}
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t("hero.titlePrefix")}{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              {t("hero.piCoin")}
            </span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-zinc-400">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/services"
              className="rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-bold transition-colors hover:bg-violet-700"
            >
              {t("hero.exploreServices")}
            </Link>
            <Link
              href="/services/bills"
              className="rounded-xl border border-white/[0.1] px-8 py-3.5 text-sm font-medium transition-colors hover:bg-white/[0.04]"
            >
              {t("hero.payBillNow")}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="border-y border-white/[0.06]">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-px sm:grid-cols-4">
          {[
            { value: "12,480+", label: t("stats.activePioneers"), color: "text-amber-400" },
            { value: "3", label: t("stats.serviceCategories"), color: "text-violet-400" },
            { value: "24+", label: t("stats.providers"), color: "text-amber-400" },
            { value: "98.5%", label: t("stats.successRate"), color: "text-emerald-400" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="mt-1 text-xs text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="mb-2 text-center text-2xl font-bold">{t("services.ourServices")}</h2>
        <p className="mb-10 text-center text-zinc-500">{t("services.everythingPi")}</p>
        <div className="grid gap-6 sm:grid-cols-3">
          {services.map((s) => (
            <Link key={s.title} href={s.href}>
              <div className="group h-full rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-2xl">
                <div className="mb-4 text-4xl">{s.icon}</div>
                <h3 className="mb-2 text-lg font-bold">{s.title}</h3>
                <p className="mb-4 text-sm text-zinc-400">{s.desc}</p>
                <span className="text-sm font-medium text-violet-400 group-hover:underline">
                  {t("services.getStarted")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-6 mb-20">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-br from-violet-600/20 to-amber-500/10 border border-white/[0.06] p-12 text-center">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">{t("cta.title")}</h2>
          <p className="mx-auto mb-8 max-w-lg text-zinc-400">
            {t("cta.subtitle")}
          </p>
          <Link
            href="/services"
            className="inline-block rounded-xl bg-violet-600 px-8 py-3.5 text-sm font-bold transition-colors hover:bg-violet-700"
          >
            {t("cta.viewAllServices")}
          </Link>
        </div>
      </section>
    </div>
  );
}
