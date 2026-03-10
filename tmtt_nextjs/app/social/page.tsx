"use client";

import { useTranslation } from "@/lib/i18n";

const samplePosts = [
  {
    id: 1, author: "Omenda Pi Pays", handle: "@omendapipays", verified: true,
    avatar: "O", time: "2h", category: "news",
    text: "🚀 Exciting news! We've just launched our Global Pioneer Map with 86 locations across 4 continents. Find Pi businesses near you!\n\n#PiMainnet #OmendaPiPays #PiCommerce",
    likes: 342, comments: 28, shares: 89,
  },
  {
    id: 2, author: "Tokyo Pi Exchange", handle: "@tokyopiex", verified: true,
    avatar: "T", time: "4h", category: "product",
    text: "📱 New arrivals! Latest smartphones and tablets now available for Pi payments. Free shipping on orders over 50 Pi! 🇯🇵\n\n#PiCommerce #Electronics #AcceptPi",
    likes: 256, comments: 14, shares: 67,
  },
  {
    id: 3, author: "Dubai Pi Luxury", handle: "@dubaipi", verified: true,
    avatar: "D", time: "5h", category: "promo",
    text: "🏨 Weekend Special! Book any 5-star hotel in Dubai Marina with Pi and get 20% off your stay.\n\nUse code: PIWEEKEND at checkout.\n\n#PiPayments #DubaiTravel #Hotels",
    likes: 189, comments: 8, shares: 43,
  },
  {
    id: 4, author: "Berlin Pi Community", handle: "@berlinpi", verified: false,
    avatar: "B", time: "6h", category: "event",
    text: "📢 Pi Pioneer Meetup — Berlin 🇩🇪\n\n📅 March 15, 2026\n📍 Factory Berlin\n🕕 6:00 PM CET\n\nJoin 200+ pioneers for networking, demos, and Pi commerce workshops!\n\n#PiMainnet #BerlinCrypto",
    likes: 412, comments: 42, shares: 156,
  },
  {
    id: 5, author: "Lagos Pi Merchants", handle: "@lagospi", verified: true,
    avatar: "L", time: "8h", category: "news",
    text: "🇳🇬 West Africa update: 150 new merchants onboarded in Lagos this month! From restaurants to clothing stores, Pi is becoming the preferred payment method.\n\n#AcceptPi #Nigeria #PiCommerce",
    likes: 528, comments: 31, shares: 201,
  },
  {
    id: 6, author: "São Paulo Pi Market", handle: "@saopaulopi", verified: true,
    avatar: "S", time: "12h", category: "hiring",
    text: "🇧🇷 We're hiring! Join the fastest-growing Pi marketplace in Latin America.\n\n• Frontend Developer (React/Next.js)\n• Community Manager\n• Customer Support Lead\n\nAll salaries paid in Pi!\n\n#PiJobs #Hiring",
    likes: 198, comments: 19, shares: 112,
  },
];

const categories: Record<string, { label: string; icon: string }> = {
  general: { label: "General", icon: "💬" },
  product: { label: "Product Launch", icon: "📦" },
  promo: { label: "Promotion", icon: "🎉" },
  news: { label: "News", icon: "📰" },
  event: { label: "Event", icon: "🎈" },
  hiring: { label: "Hiring", icon: "💼" },
};

const trending = [
  { rank: 1, tag: "#PiMainnet", posts: "2,840", category: "Trending" },
  { rank: 2, tag: "#PiCommerce", posts: "1,420", category: "Business" },
  { rank: 3, tag: "#AcceptPi", posts: "980", category: "Trending" },
  { rank: 4, tag: "#PiPayments", posts: "760", category: "Finance" },
  { rank: 5, tag: "#OmendaPiPays", posts: "540", category: "Platform" },
];

const topPioneers = [
  { name: "Omenda Pi Pays", handle: "@omendapipays", avatar: "O", followers: "12.4K" },
  { name: "Tokyo Pi Exchange", handle: "@tokyopiex", avatar: "T", followers: "8.2K" },
  { name: "Lagos Pi Merchants", handle: "@lagospi", avatar: "L", followers: "6.8K" },
  { name: "Dubai Pi Luxury", handle: "@dubaipi", avatar: "D", followers: "5.4K" },
  { name: "Berlin Pi Community", handle: "@berlinpi", avatar: "B", followers: "4.1K" },
];

function formatText(text: string) {
  return text.split(/(#\w+)/g).map((part, i) =>
    part.startsWith("#") ? (
      <span key={i} className="text-violet-400 font-semibold cursor-pointer hover:underline">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function SocialPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-6 pt-8 pb-2">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1">
          📢 {t("social.title")}{" "}
          <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
            {t("social.titleHighlight")}
          </span>
        </h1>
        <p className="text-zinc-400 text-sm">{t("social.subtitle")}</p>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Main Feed */}
        <div>
          {/* Live indicator */}
          <div className="flex items-center gap-3 px-5 py-3 bg-green-500/[0.06] border border-green-500/15 rounded-2xl mb-4 text-sm text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <strong className="text-white">Live Feed</strong> — {t("social.liveDescription") || "Posts from verified businesses and pioneers"}
          </div>

          {/* Create Post */}
          <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-5 mb-5">
            <div className="flex gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-600 to-amber-400 flex items-center justify-center font-extrabold text-white shrink-0">?</div>
              <textarea
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm resize-y min-h-[80px] outline-none focus:border-violet-600 placeholder:text-zinc-500 font-[inherit]"
                placeholder={t("social.postPlaceholder") || "What's happening in Pi commerce?"}
                maxLength={2000}
              />
            </div>
            <div className="flex justify-between items-center border-t border-white/[0.08] pt-3">
              <div className="flex gap-1">
                <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-zinc-500 rounded-lg hover:bg-white/[0.04] hover:text-zinc-300 transition-colors">
                  📷 {t("social.photo") || "Photo"}
                </button>
                <select className="bg-white/[0.04] border border-white/[0.08] text-zinc-400 px-3 py-2 rounded-lg text-xs cursor-pointer outline-none">
                  <option>General</option>
                  <option>Product Launch</option>
                  <option>Promotion</option>
                  <option>News</option>
                  <option>Event</option>
                  <option>Hiring</option>
                </select>
              </div>
              <button className="bg-violet-600 text-white px-7 py-2.5 rounded-full font-bold text-sm hover:bg-violet-700 transition-colors disabled:opacity-40" disabled>
                {t("social.broadcast")}
              </button>
            </div>
          </div>

          {/* Feed Tabs */}
          <div className="flex gap-1 bg-[#111114] border border-white/[0.08] rounded-2xl p-1 mb-5 overflow-x-auto">
            {[["all", "All"], ["product", "📦 Product"], ["promo", "🎉 Promo"], ["news", "📰 News"], ["event", "🎈 Event"], ["hiring", "💼 Hiring"]].map(([key, label], i) => (
              <button
                key={key}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${i === 0 ? "bg-violet-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Post Cards */}
          <div className="flex flex-col gap-4">
            {samplePosts.map((post) => {
              const cat = categories[post.category] || categories.general;
              return (
                <div key={post.id} className="bg-[#111114] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/[0.16] transition-colors">
                  {/* Header */}
                  <div className="flex justify-between items-center px-5 pt-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-600 to-amber-400 flex items-center justify-center font-extrabold text-white">
                        {post.avatar}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">
                          {post.author}
                          {post.verified && (
                            <span className="inline-flex items-center gap-1 text-[0.6875rem] font-bold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 ml-1.5">✓ Verified</span>
                          )}
                        </h4>
                        <span className="text-zinc-500 text-xs">{post.handle} · {post.time} ago</span>
                      </div>
                    </div>
                    <button className="text-zinc-500 hover:text-white transition-colors text-lg px-2 py-1 rounded-md hover:bg-white/[0.06]">⋯</button>
                  </div>

                  {/* Body */}
                  <div className="px-5 py-3">
                    <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">{formatText(post.text)}</p>
                  </div>

                  {/* Category */}
                  {post.category !== "general" && (
                    <div className="mx-5 mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-600/10 text-violet-300">
                      {cat.icon} {cat.label}
                    </div>
                  )}

                  {/* Engagement */}
                  <div className="px-5 pb-2 flex justify-between text-xs text-zinc-500">
                    <span className="cursor-pointer hover:underline hover:text-zinc-400">{post.likes} likes</span>
                    <span>{post.comments} comments · {post.shares} shares</span>
                  </div>

                  {/* Actions */}
                  <div className="flex border-t border-white/[0.08]">
                    {[["🤍", "Like"], ["💬", "Comment"], ["🔗", "Share"]].map(([icon, label]) => (
                      <button
                        key={label}
                        className="flex-1 flex items-center justify-center gap-2 py-3 text-zinc-500 text-xs font-semibold hover:bg-white/[0.04] hover:text-white transition-colors border-r border-white/[0.08] last:border-r-0"
                      >
                        <span>{icon}</span> {label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4 lg:order-none order-first">
          {/* Trending */}
          <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-5">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">🔥 {t("social.trending")}</h3>
            {trending.map((item) => (
              <div key={item.rank} className="py-2.5 border-b border-white/[0.04] last:border-b-0 cursor-pointer group">
                <div className="text-[0.6875rem] text-zinc-500">{item.rank} · {item.category}</div>
                <div className="text-sm font-bold group-hover:text-amber-400 transition-colors">{item.tag}</div>
                <div className="text-xs text-zinc-500">{item.posts} posts</div>
              </div>
            ))}
          </div>

          {/* Top Pioneers */}
          <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-5">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">⭐ {t("social.topPioneers")}</h3>
            {topPioneers.map((p) => (
              <div key={p.handle} className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-b-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-amber-400 flex items-center justify-center font-extrabold text-white text-xs">{p.avatar}</div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-bold truncate">{p.name}</h5>
                  <span className="text-[0.6875rem] text-zinc-500">{p.followers} followers</span>
                </div>
                <button className="border border-violet-600 text-violet-400 px-3.5 py-1 rounded-full text-[0.6875rem] font-bold hover:bg-violet-600 hover:text-white transition-colors">Follow</button>
              </div>
            ))}
          </div>

          {/* Community Stats */}
          <div className="bg-[#111114] border border-white/[0.08] rounded-2xl p-5">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">📈 {t("social.communityStats")}</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: "12,480", label: "Pioneers", color: "text-amber-400" },
                { val: "3,240", label: "Businesses", color: "text-violet-400" },
                { val: "8,650", label: "Posts Today", color: "text-green-400" },
                { val: "86", label: "Countries", color: "text-white" },
              ].map((s) => (
                <div key={s.label} className="text-center p-3 bg-white/[0.04] rounded-xl">
                  <div className={`text-lg font-extrabold ${s.color}`}>{s.val}</div>
                  <div className="text-[0.6875rem] text-zinc-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
