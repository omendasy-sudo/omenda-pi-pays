"use client";

import { useState } from "react";

interface Order {
  id: string;
  user: string;
  email: string;
  service: "Hotel Booking" | "Property" | "Bill Payment";
  item: string;
  amount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  date: string;
  piTxId: string;
}

const mockOrders: Order[] = [
  { id: "ORD-2026-001", user: "John Mashauri", email: "john@pi.app", service: "Hotel Booking", item: "Serena Hotel Dar (3 nights)", amount: 360, status: "confirmed", date: "2026-03-08", piTxId: "pi_tx_a1b2c3" },
  { id: "ORD-2026-002", user: "Amina Khamis", email: "amina@pi.app", service: "Bill Payment", item: "TANESCO - Electricity", amount: 45, status: "completed", date: "2026-03-08", piTxId: "pi_tx_d4e5f6" },
  { id: "ORD-2026-003", user: "David Omondi", email: "david@pi.app", service: "Property", item: "Modern Villa - Inquiry", amount: 450000, status: "pending", date: "2026-03-07", piTxId: "pi_tx_g7h8i9" },
  { id: "ORD-2026-004", user: "Fatma Hassan", email: "fatma@pi.app", service: "Hotel Booking", item: "Zanzibar Beach (3 nights)", amount: 600, status: "confirmed", date: "2026-03-07", piTxId: "pi_tx_j1k2l3" },
  { id: "ORD-2026-005", user: "Peter Njoroge", email: "peter@pi.app", service: "Bill Payment", item: "Vodacom - Phone", amount: 25, status: "completed", date: "2026-03-07", piTxId: "pi_tx_m4n5o6" },
  { id: "ORD-2026-006", user: "Grace Wanjiku", email: "grace@pi.app", service: "Bill Payment", item: "DSTV - Subscription", amount: 30, status: "cancelled", date: "2026-03-06", piTxId: "pi_tx_p7q8r9" },
  { id: "ORD-2026-007", user: "Ali Rashid", email: "ali@pi.app", service: "Hotel Booking", item: "City Lodge (3 nights)", amount: 135, status: "pending", date: "2026-03-06", piTxId: "pi_tx_s1t2u3" },
  { id: "ORD-2026-008", user: "Sarah Lameck", email: "sarah@pi.app", service: "Property", item: "3BR Apartment Westlands", amount: 85000, status: "pending", date: "2026-03-06", piTxId: "pi_tx_v4w5x6" },
  { id: "ORD-2026-009", user: "Bakari Musa", email: "bakari@pi.app", service: "Bill Payment", item: "Raha Fiber - Internet", amount: 35, status: "completed", date: "2026-03-05", piTxId: "pi_tx_y7z8a1" },
  { id: "ORD-2026-010", user: "Janet Mwangi", email: "janet@pi.app", service: "Hotel Booking", item: "Mountain View Inn (2 nights)", amount: 110, status: "completed", date: "2026-03-05", piTxId: "pi_tx_b2c3d4" },
  { id: "ORD-2026-011", user: "Omari Said", email: "omari@pi.app", service: "Bill Payment", item: "Kenya Power", amount: 60, status: "completed", date: "2026-03-04", piTxId: "pi_tx_e5f6g7" },
  { id: "ORD-2026-012", user: "Diana Koech", email: "diana@pi.app", service: "Property", item: "Retail Space - Mlimani", amount: 95000, status: "confirmed", date: "2026-03-04", piTxId: "pi_tx_h8i9j1" },
];

const statusColor: Record<string, string> = {
  confirmed: "bg-emerald-500/15 text-emerald-400",
  completed: "bg-blue-500/15 text-blue-400",
  pending: "bg-amber-500/15 text-amber-400",
  cancelled: "bg-rose-500/15 text-rose-400",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterService, setFilterService] = useState<string>("all");
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = orders.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.user.toLowerCase().includes(search.toLowerCase()) || o.item.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    const matchService = filterService === "all" || o.service === filterService;
    return matchSearch && matchStatus && matchService;
  });

  const totalRevenue = filtered.reduce((sum, o) => sum + (o.status !== "cancelled" ? o.amount : 0), 0);

  function updateStatus(id: string, status: Order["status"]) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    if (selected?.id === id) setSelected({ ...selected, status });
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orders & Bookings</h1>
          <p className="text-sm text-zinc-500">{filtered.length} orders · {totalRevenue.toLocaleString()} π total</p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-center">
            <div className="text-xs text-zinc-500">Completed</div>
            <div className="text-sm font-bold text-emerald-400">{orders.filter((o) => o.status === "completed").length}</div>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-center">
            <div className="text-xs text-zinc-500">Pending</div>
            <div className="text-sm font-bold text-amber-400">{orders.filter((o) => o.status === "pending").length}</div>
          </div>
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-center">
            <div className="text-xs text-zinc-500">Cancelled</div>
            <div className="text-sm font-bold text-rose-400">{orders.filter((o) => o.status === "cancelled").length}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input type="text" placeholder="Search orders, users, items..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none placeholder:text-zinc-600 focus:border-violet-500/50" />
        <select value={filterService} onChange={(e) => setFilterService(e.target.value)} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50">
          <option value="all">All Services</option>
          <option value="Hotel Booking">Hotels</option>
          <option value="Property">Properties</option>
          <option value="Bill Payment">Bills</option>
        </select>
        <div className="flex gap-2">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`rounded-lg px-3 py-2 text-xs font-medium capitalize transition-colors ${filterStatus === s ? "bg-violet-600 text-white" : "text-zinc-400 hover:bg-white/[0.06]"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06] text-left text-xs text-zinc-500">
                <th className="px-5 py-3 font-medium">Order ID</th>
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Item</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-mono text-sm text-zinc-300">{order.id}</td>
                  <td className="px-5 py-3">
                    <div className="text-sm font-medium">{order.user}</div>
                    <div className="text-[11px] text-zinc-500">{order.email}</div>
                  </td>
                  <td className="px-5 py-3 text-sm text-zinc-400">{order.service}</td>
                  <td className="px-5 py-3 text-sm">{order.item}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-amber-400">{order.amount.toLocaleString()} π</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${statusColor[order.status]}`}>{order.status}</span>
                  </td>
                  <td className="px-5 py-3 text-sm text-zinc-500">{order.date}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => setSelected(order)} className="rounded-lg bg-white/[0.06] px-2.5 py-1.5 text-xs text-zinc-400 hover:bg-white/[0.12] hover:text-white">View</button>
                      {order.status === "pending" && (
                        <>
                          <button onClick={() => updateStatus(order.id, "confirmed")} className="rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-xs text-emerald-400 hover:bg-emerald-500/20">✓</button>
                          <button onClick={() => updateStatus(order.id, "cancelled")} className="rounded-lg bg-rose-500/10 px-2.5 py-1.5 text-xs text-rose-400 hover:bg-rose-500/20">✗</button>
                        </>
                      )}
                      {order.status === "confirmed" && (
                        <button onClick={() => updateStatus(order.id, "completed")} className="rounded-lg bg-blue-500/10 px-2.5 py-1.5 text-xs text-blue-400 hover:bg-blue-500/20">Complete</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zinc-500">No orders found</div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="mx-4 w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#111113] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold">Order Details</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColor[selected.status]}`}>{selected.status}</span>
            </div>
            <div className="space-y-3 text-sm">
              {[
                ["Order ID", selected.id],
                ["User", selected.user],
                ["Email", selected.email],
                ["Service", selected.service],
                ["Item", selected.item],
                ["Amount", `${selected.amount.toLocaleString()} π`],
                ["Date", selected.date],
                ["Pi Transaction", selected.piTxId],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-white/[0.04] pb-2">
                  <span className="text-zinc-500">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <div className="flex gap-2">
                {selected.status === "pending" && (
                  <>
                    <button onClick={() => updateStatus(selected.id, "confirmed")} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-700">Confirm</button>
                    <button onClick={() => updateStatus(selected.id, "cancelled")} className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold hover:bg-rose-700">Cancel</button>
                  </>
                )}
                {selected.status === "confirmed" && (
                  <button onClick={() => updateStatus(selected.id, "completed")} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700">Mark Completed</button>
                )}
              </div>
              <button onClick={() => setSelected(null)} className="rounded-xl px-4 py-2 text-sm text-zinc-400 hover:text-white">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
