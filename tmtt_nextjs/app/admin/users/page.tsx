"use client";

import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  piUsername: string;
  role: "user" | "seller" | "admin";
  status: "active" | "suspended" | "pending";
  kycVerified: boolean;
  walletBalance: number;
  totalSpent: number;
  ordersCount: number;
  joinDate: string;
  lastActive: string;
}

const mockUsers: User[] = [
  { id: "u1", name: "John Mashauri", email: "john@pi.app", piUsername: "@john_tz", role: "seller", status: "active", kycVerified: true, walletBalance: 2450, totalSpent: 1280, ordersCount: 12, joinDate: "2025-06-15", lastActive: "2026-03-08" },
  { id: "u2", name: "Amina Khamis", email: "amina@pi.app", piUsername: "@amina_ke", role: "user", status: "active", kycVerified: true, walletBalance: 890, totalSpent: 560, ordersCount: 8, joinDate: "2025-08-22", lastActive: "2026-03-08" },
  { id: "u3", name: "David Omondi", email: "david@pi.app", piUsername: "@david_ug", role: "user", status: "active", kycVerified: true, walletBalance: 15200, totalSpent: 450000, ordersCount: 3, joinDate: "2025-09-10", lastActive: "2026-03-07" },
  { id: "u4", name: "Fatma Hassan", email: "fatma@pi.app", piUsername: "@fatma_zn", role: "seller", status: "active", kycVerified: true, walletBalance: 4100, totalSpent: 2340, ordersCount: 18, joinDate: "2025-05-03", lastActive: "2026-03-07" },
  { id: "u5", name: "Peter Njoroge", email: "peter@pi.app", piUsername: "@peter_ke", role: "user", status: "active", kycVerified: true, walletBalance: 320, totalSpent: 180, ordersCount: 5, joinDate: "2025-11-18", lastActive: "2026-03-07" },
  { id: "u6", name: "Grace Wanjiku", email: "grace@pi.app", piUsername: "@grace_ke", role: "user", status: "suspended", kycVerified: true, walletBalance: 50, totalSpent: 120, ordersCount: 4, joinDate: "2025-10-07", lastActive: "2026-03-01" },
  { id: "u7", name: "Ali Rashid", email: "ali@pi.app", piUsername: "@ali_tz", role: "user", status: "active", kycVerified: false, walletBalance: 680, totalSpent: 400, ordersCount: 6, joinDate: "2025-12-20", lastActive: "2026-03-06" },
  { id: "u8", name: "Sarah Lameck", email: "sarah@pi.app", piUsername: "@sarah_tz", role: "seller", status: "active", kycVerified: true, walletBalance: 7800, totalSpent: 85000, ordersCount: 2, joinDate: "2025-07-14", lastActive: "2026-03-06" },
  { id: "u9", name: "Bakari Musa", email: "bakari@pi.app", piUsername: "@bakari_tz", role: "user", status: "pending", kycVerified: false, walletBalance: 0, totalSpent: 0, ordersCount: 0, joinDate: "2026-03-05", lastActive: "2026-03-05" },
  { id: "u10", name: "Janet Mwangi", email: "janet@pi.app", piUsername: "@janet_ke", role: "user", status: "active", kycVerified: true, walletBalance: 1200, totalSpent: 920, ordersCount: 9, joinDate: "2025-08-01", lastActive: "2026-03-05" },
];

const statusColor: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-400",
  suspended: "bg-rose-500/15 text-rose-400",
  pending: "bg-amber-500/15 text-amber-400",
};

const roleColor: Record<string, string> = {
  admin: "bg-violet-500/15 text-violet-400",
  seller: "bg-blue-500/15 text-blue-400",
  user: "bg-zinc-500/15 text-zinc-400",
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selected, setSelected] = useState<User | null>(null);

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.piUsername.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    const matchStatus = filterStatus === "all" || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  function updateUser(id: string, updates: Partial<User>) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
    if (selected?.id === id) setSelected({ ...selected, ...updates });
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users Management</h1>
          <p className="text-sm text-zinc-500">{users.length} total users · {users.filter((u) => u.status === "active").length} active</p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-center">
            <div className="text-xs text-zinc-500">KYC Verified</div>
            <div className="text-sm font-bold text-emerald-400">{users.filter((u) => u.kycVerified).length}</div>
          </div>
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-center">
            <div className="text-xs text-zinc-500">Sellers</div>
            <div className="text-sm font-bold text-blue-400">{users.filter((u) => u.role === "seller").length}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input type="text" placeholder="Search name, email, Pi username..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none placeholder:text-zinc-600 focus:border-violet-500/50" />
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm outline-none focus:border-violet-500/50">
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="seller">Seller</option>
          <option value="user">User</option>
        </select>
        <div className="flex gap-2">
          {["all", "active", "suspended", "pending"].map((s) => (
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
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-5 py-3 font-medium">Pi Username</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">KYC</th>
                <th className="px-5 py-3 font-medium">Balance</th>
                <th className="px-5 py-3 font-medium">Orders</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-amber-400 text-sm font-bold text-white">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-[11px] text-zinc-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-violet-400">{user.piUsername}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${roleColor[user.role]}`}>{user.role}</span>
                  </td>
                  <td className="px-5 py-3 text-sm">
                    {user.kycVerified ? <span className="text-emerald-400">✓ Verified</span> : <span className="text-zinc-500">✗ Pending</span>}
                  </td>
                  <td className="px-5 py-3 text-sm font-semibold text-amber-400">{user.walletBalance.toLocaleString()} π</td>
                  <td className="px-5 py-3 text-sm text-zinc-400">{user.ordersCount}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${statusColor[user.status]}`}>{user.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => setSelected(user)} className="rounded-lg bg-white/[0.06] px-2.5 py-1.5 text-xs text-zinc-400 hover:bg-white/[0.12] hover:text-white">View</button>
                      {user.status === "active" ? (
                        <button onClick={() => updateUser(user.id, { status: "suspended" })} className="rounded-lg bg-rose-500/10 px-2.5 py-1.5 text-xs text-rose-400 hover:bg-rose-500/20">Suspend</button>
                      ) : (
                        <button onClick={() => updateUser(user.id, { status: "active" })} className="rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-xs text-emerald-400 hover:bg-emerald-500/20">Activate</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zinc-500">No users found</div>
        )}
      </div>

      {/* User Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="mx-4 w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#111113] p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-amber-400 text-xl font-bold">
                {selected.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h2 className="text-lg font-bold">{selected.name}</h2>
                <p className="text-sm text-violet-400">{selected.piUsername}</p>
              </div>
            </div>
            <div className="mb-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/[0.04] p-3 text-center">
                <div className="text-lg font-bold text-amber-400">{selected.walletBalance.toLocaleString()}</div>
                <div className="text-[10px] text-zinc-500">Balance (π)</div>
              </div>
              <div className="rounded-xl bg-white/[0.04] p-3 text-center">
                <div className="text-lg font-bold">{selected.ordersCount}</div>
                <div className="text-[10px] text-zinc-500">Orders</div>
              </div>
              <div className="rounded-xl bg-white/[0.04] p-3 text-center">
                <div className="text-lg font-bold text-emerald-400">{selected.totalSpent.toLocaleString()}</div>
                <div className="text-[10px] text-zinc-500">Total Spent (π)</div>
              </div>
            </div>
            <div className="space-y-2.5 text-sm">
              {[
                ["Email", selected.email],
                ["Role", selected.role],
                ["Status", selected.status],
                ["KYC", selected.kycVerified ? "Verified ✓" : "Pending ✗"],
                ["Joined", selected.joinDate],
                ["Last Active", selected.lastActive],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-white/[0.04] pb-2">
                  <span className="text-zinc-500">{label}</span>
                  <span className="font-medium capitalize">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <div className="flex gap-2">
                <select
                  value={selected.role}
                  onChange={(e) => updateUser(selected.id, { role: e.target.value as User["role"] })}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm outline-none"
                >
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
                {!selected.kycVerified && (
                  <button onClick={() => updateUser(selected.id, { kycVerified: true })} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-700">Verify KYC</button>
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
