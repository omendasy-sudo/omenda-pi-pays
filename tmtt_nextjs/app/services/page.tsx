"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function ServicesPage() {
  const { t } = useTranslation();

  const services = [
    {
      id: "hotels",
      title: t("services.rentHotel"),
      description: t("services.rentHotelDesc"),
      icon: "🏨",
      href: "/services/hotels",
      color: "from-violet-600 to-purple-700",
      count: 6,
    },
    {
      id: "homes",
      title: t("services.buyHome"),
      description: t("services.buyHomeDesc"),
      icon: "🏠",
      href: "/services/homes",
      color: "from-amber-500 to-orange-600",
      count: 6,
    },
    {
      id: "bills",
      title: t("services.payBills"),
      description: t("services.payBillsDesc"),
      icon: "💳",
      href: "/services/bills",
      color: "from-emerald-500 to-green-600",
      count: 12,
    },
    {
      id: "transport",
      title: t("transport.title"),
      description: t("transport.heroDesc"),
      icon: "🚗",
      href: "/services/transport",
      color: "from-cyan-500 to-teal-600",
      count: 20,
    },
  ];

  const stats = [
    { label: t("services.totalServices"), value: "4", icon: "🔧" },
    { label: t("services.hotelsListed"), value: "6+", icon: "🏨" },
    { label: t("services.properties"), value: "6+", icon: "🏠" },
    { label: t("transport.activeDrivers"), value: "2,400+", icon: "🚗" },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-amber-900/10" />
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-400">
            <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
            {t("services.piPowered")}
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t("services.allServicesOnePlatform")}{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              {t("services.onePlatform")}
            </span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-zinc-400">
            {t("services.pageSubtitle")}
          </p>

          {/* Stats */}
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 backdrop-blur"
              >
                <div className="text-2xl">{s.icon}</div>
                <div className="mt-2 text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-zinc-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="mb-8 text-2xl font-bold">{t("services.chooseService")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.id} href={service.href}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all hover:border-white/[0.12] hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity group-hover:opacity-[0.06]`}
                />
                <div className="relative">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06] text-3xl">
                    {service.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                  <p className="mb-4 text-sm text-zinc-400">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">{service.count} {t("services.options")}</span>
                    <span className="flex items-center gap-1 text-sm font-medium text-violet-400 transition-transform group-hover:translate-x-1">
                      {t("services.explore")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-20">
          <h2 className="mb-8 text-center text-2xl font-bold">{t("services.howItWorks")}</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { step: "01", title: t("services.step01"), desc: t("services.step01Desc"), icon: "🔍" },
              { step: "02", title: t("services.step02"), desc: t("services.step02Desc"), icon: "⚙️" },
              { step: "03", title: t("services.step03"), desc: t("services.step03Desc"), icon: "π" },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10 text-xl font-bold text-violet-400">
                  {item.icon}
                </div>
                <div className="mb-1 text-xs font-bold text-zinc-500">STEP {item.step}</div>
                <h3 className="mb-2 font-bold">{item.title}</h3>
                <p className="text-sm text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
