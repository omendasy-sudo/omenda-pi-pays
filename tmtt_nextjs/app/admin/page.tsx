"use client";

import Link from "next/link";
import { useState } from "react";
import { useGcv } from "@/components/GcvProvider";

// Mock dashboard data
const stats = [
  { label: "Total Revenue", value: "45,820 π", change: "+12.5%", trend: "up", icon: "💰", color: "amber" },
  { label: "Total Bookings", value: "1,284", change: "+8.2%", trend: "up", icon: "📦", color: "violet" },
  { label: "Active Users", value: "3,429", change: "+15.3%", trend: "up", icon: "👥", color: "emerald" },
  { label: "Pending Orders", value: "47", change: "-3.1%", trend: "down", icon: "⏳", color: "rose" },
];

const recentOrders = [
  { id: "ORD-2026-001", user: "John M.", service: "Hotel Booking", item: "Serena Hotel", amount: 360, status: "confirmed", date: "2026-03-08" },
  { id: "ORD-2026-002", user: "Amina K.", service: "Bill Payment", item: "TANESCO", amount: 45, status: "completed", date: "2026-03-08" },
  { id: "ORD-2026-003", user: "David O.", service: "Property", item: "Modern Villa", amount: 450000, status: "pending", date: "2026-03-07" },
  { id: "ORD-2026-004", user: "Fatma H.", service: "Hotel Booking", item: "Zanzibar Beach", amount: 600, status: "confirmed", date: "2026-03-07" },
  { id: "ORD-2026-005", user: "Peter N.", service: "Bill Payment", item: "Vodacom", amount: 25, status: "completed", date: "2026-03-07" },
  { id: "ORD-2026-006", user: "Grace W.", service: "Bill Payment", item: "DSTV", amount: 30, status: "cancelled", date: "2026-03-06" },
  { id: "ORD-2026-007", user: "Ali R.", service: "Hotel Booking", item: "City Lodge", amount: 135, status: "pending", date: "2026-03-06" },
  { id: "ORD-2026-008", user: "Sarah L.", service: "Property", item: "3BR Apartment", amount: 85000, status: "pending", date: "2026-03-06" },
];

const topServices = [
  { name: "Hotel Bookings", count: 482, revenue: "18,240 π", pct: 40 },
  { name: "Bill Payments", count: 635, revenue: "12,580 π", pct: 27 },
  { name: "Property Inquiries", count: 167, revenue: "15,000 π", pct: 33 },
];

const statusColor: Record<string, string> = {
  confirmed: "bg-emerald-500/15 text-emerald-400",
  completed: "bg-blue-500/15 text-blue-400",
  pending: "bg-amber-500/15 text-amber-400",
  cancelled: "bg-rose-500/15 text-rose-400",
};

export default function AdminDashboard() {
  const [period, setPeriod] = useState("7d");
  const { formatUsd } = useGcv();

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-zinc-500">Welcome back, Admin. Here&apos;s your overview.</p>
        </div>
        <div className="flex items-center gap-2">
          {["24h", "7d", "30d", "All"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                period === p
                  ? "bg-violet-600 text-white"
                  : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-2xl">{stat.icon}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  stat.trend === "up"
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-rose-500/15 text-rose-400"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-zinc-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        {/* Revenue Breakdown */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 lg:col-span-2">
          <h3 className="mb-1 text-sm font-bold">Revenue by Service</h3>
          <p className="mb-6 text-xs text-zinc-500">Breakdown of revenue across all services</p>
          <div className="space-y-4">
            {topServices.map((service) => (
              <div key={service.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">{service.name}</span>
                  <span className="text-zinc-400">
                    {service.revenue} · {service.count} orders
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-amber-400 transition-all"
                    style={{ width: `${service.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
          <h3 className="mb-1 text-sm font-bold">Platform Health</h3>
          <p className="mb-6 text-xs text-zinc-500">Key performance indicators</p>
          <div className="space-y-4">
            {[
              { label: "Success Rate", value: "98.5%", color: "text-emerald-400" },
              { label: "Avg. Response", value: "1.2s", color: "text-violet-400" },
              { label: "Active Sessions", value: "342", color: "text-amber-400" },
              { label: "Uptime", value: "99.9%", color: "text-emerald-400" },
              { label: "Pi Processed", value: "45,820 π", color: "text-amber-400" },
            ].map((kpi) => (
              <div key={kpi.label} className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">{kpi.label}</span>
                <span className={`text-sm font-bold ${kpi.color}`}>{kpi.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
          <div>
            <h3 className="text-sm font-bold">Recent Orders</h3>
            <p className="text-xs text-zinc-500">Latest transactions across all services</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-medium text-violet-400 hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06] text-left text-xs text-zinc-500">
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Service</th>
                <th className="px-6 py-3 font-medium">Item</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-6 py-3 text-sm font-mono text-zinc-300">{order.id}</td>
                  <td className="px-6 py-3 text-sm">{order.user}</td>
                  <td className="px-6 py-3 text-sm text-zinc-400">{order.service}</td>
                  <td className="px-6 py-3 text-sm">{order.item}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-amber-400">
                    <span className="block text-[10px] text-zinc-500 font-normal">&asymp; {formatUsd(order.amount)}</span>
                    {order.amount.toLocaleString()} π
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${
                        statusColor[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-zinc-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
