import { useState } from "react";

const SPORT_TABS = [
  "Cricket", "Football", "Tennis", "Table Tennis", "Esoccer",
  "Horse Racing", "Greyhound Racing", "Basketball", "Wrestling",
  "Volleyball", "Badminton", "Snooker", "Darts",
];

const MATCHES = [
  { name: "Lucknow Super Giants v R C Bengaluru", time: "07/05/2026 19:30", back1: "1.29", lay1: "1.33", backX: null, layX: null, back2: "4.30", lay2: "4.50", live: true, tv: true, bm: true, fancy: true },
  { name: "Bangladesh v Pakistan", time: "08/05/2026 09:30", back1: "2.44", lay1: "2.48", backX: "16", layX: "16.5", back2: "1.87", lay2: "1.89", live: false, bm: true },
  { name: "Essex v Hampshire", time: "08/05/2026 15:30", back1: "1.60", lay1: "1.80", backX: null, layX: null, back2: "2.26", lay2: "2.68", live: false },
  { name: "Lancashire v Middlesex", time: "08/05/2026 15:30", back1: "1.60", lay1: "1.95", backX: null, layX: null, back2: "2.06", lay2: "2.68", live: false },
  { name: "Derbyshire v Northamptonshire", time: "08/05/2026 15:30", back1: "2.02", lay1: "2.68", backX: null, layX: null, back2: "1.60", lay2: "1.99", live: false },
  { name: "Delhi Capitals v Kolkata Knight Riders", time: "08/05/2026 19:30", back1: "1.96", lay1: "1.98", backX: null, layX: null, back2: "2.02", lay2: "2.04", live: false, bm: true },
  { name: "Rajasthan Royals v Gujarat Titans", time: "09/05/2026 19:30", back1: "1.83", lay1: "1.87", backX: null, layX: null, back2: "2.16", lay2: "2.22", live: false },
  { name: "Chennai Super Kings v Lucknow Super Giants", time: "10/05/2026 15:30", back1: "1.76", lay1: "1.94", backX: null, layX: null, back2: "2.06", lay2: "2.32", live: false },
  { name: "Mumbai Indians v Sunrisers Hyderabad (e)", time: "07/05/2026 23:21", back1: null, lay1: null, backX: null, layX: null, back2: null, lay2: null, live: true, tv: true, esim: true },
  { name: "Lucknow Super Giants v Delhi Capitals (e)", time: "07/05/2026 23:21", back1: null, lay1: null, backX: null, layX: null, back2: null, lay2: null, live: true, tv: true, esim: true },
];

const CASINO_GAMES = [
  { name: "Matka Market", emoji: "🎯", category: "Matka", hot: false },
  { name: "VIP Teenpatti 1 Day", emoji: "♠️", category: "Teenpatti", hot: true },
  { name: "Doli Dana Live", emoji: "🎪", category: "Live", hot: false },
  { name: "Mogambo", emoji: "🎭", category: "Card", hot: false },
  { name: "20-20 Teen Patti", emoji: "🃏", category: "Teenpatti", hot: true },
  { name: "Lucky 6", emoji: "6️⃣", category: "Lucky", hot: false },
  { name: "Beach Roulette", emoji: "🌊", category: "Roulette", hot: false },
  { name: "Golden Roulette", emoji: "🥇", category: "Roulette", hot: true },
  { name: "Poison Teenpatti One Day", emoji: "☠️", category: "Teenpatti", hot: false },
  { name: "Unique Teenpatti", emoji: "✨", category: "Teenpatti", hot: false },
  { name: "Unlimited Joker 20", emoji: "🤡", category: "Joker", hot: true },
  { name: "Bollywood Casino 2", emoji: "🎬", category: "Casino", hot: true },
  { name: "Mini Super Over IND vs AUS", emoji: "🏏", category: "Cricket", hot: true },
  { name: "Goal", emoji: "⚽", category: "Football", hot: false },
  { name: "Andar Bahar 150 Cards", emoji: "🃏", category: "Andar Bahar", hot: false },
  { name: "Lucky 15", emoji: "🍀", category: "Lucky", hot: true },
  { name: "Dragon Tiger 20-20", emoji: "🐉", category: "Dragon Tiger", hot: true },
  { name: "32 Cards A", emoji: "🎴", category: "32 Cards", hot: false },
  { name: "Andar Bahar", emoji: "🃏", category: "Andar Bahar", hot: true },
  { name: "Instant Teenpatti 3.0", emoji: "⚡", category: "Teenpatti", hot: true },
  { name: "Ball by Ball", emoji: "🏏", category: "Cricket", hot: true },
  { name: "20-20 Teenpatti", emoji: "🃏", category: "Teenpatti", hot: true },
  { name: "20-20 Poker", emoji: "♥️", category: "Poker", hot: true },
  { name: "Baccarat", emoji: "🃏", category: "Baccarat", hot: false },
  { name: "Worli Matka", emoji: "🎯", category: "Matka", hot: true },
  { name: "5 Five Cricket", emoji: "🏏", category: "Cricket", hot: true },
  { name: "The Trap", emoji: "🕸️", category: "Card", hot: true },
  { name: "Amar Akbar Anthony 2.0", emoji: "🎬", category: "Live", hot: true },
  { name: "Casino War", emoji: "⚔️", category: "Casino", hot: false },
  { name: "Sic Bo", emoji: "🎲", category: "Dice", hot: false },
];

const CATEGORIES = ["All", "Teenpatti", "Roulette", "Baccarat", "Poker", "Andar Bahar", "Dragon Tiger", "Cricket", "Matka", "Lucky", "32 Cards", "Dice", "Card", "Live"];

const BG_COLORS = [
  "bg-slate-700", "bg-blue-800", "bg-indigo-800", "bg-violet-800",
  "bg-emerald-800", "bg-teal-800", "bg-cyan-800", "bg-rose-800",
  "bg-amber-800", "bg-orange-800", "bg-red-800", "bg-fuchsia-800",
];

// Mobile match card
function MatchCard({ match }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          {match.live && (
            <span className="mt-1 w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 animate-pulse" />
          )}
          <div className="min-w-0">
            <p className="font-semibold text-slate-800 text-xs leading-snug truncate">{match.name}</p>
            <p className="text-slate-400 text-[10px] mt-0.5">{match.time}</p>
          </div>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          {match.tv && <span className="text-[10px]">📺</span>}
          {match.bm && <span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-1.5 py-0.5 rounded">BM</span>}
          {match.fancy && <span className="bg-violet-100 text-violet-700 text-[9px] font-bold px-1.5 py-0.5 rounded">F</span>}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: "1", back: match.back1, lay: match.lay1, backColor: "bg-blue-100 text-blue-800", layColor: "bg-rose-100 text-rose-800" },
          { label: "X", back: match.backX, lay: match.layX, backColor: "bg-slate-100 text-slate-700", layColor: "bg-slate-100 text-slate-700" },
          { label: "2", back: match.back2, lay: match.lay2, backColor: "bg-blue-100 text-blue-800", layColor: "bg-rose-100 text-rose-800" },
        ].map(({ label, back, lay, backColor, layColor }) => (
          <div key={label} className="flex flex-col gap-1">
            <span className="text-[9px] text-center text-slate-400 font-bold">{label}</span>
            <button className={`py-1.5 rounded text-[10px] font-bold text-center ${back ? backColor : "bg-slate-50 text-slate-300"}`}>
              {back || "-"}
            </button>
            <button className={`py-1.5 rounded text-[10px] font-bold text-center ${lay ? layColor : "bg-slate-50 text-slate-300"}`}>
              {lay || "-"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Desktop odds button
function OddsBtn({ value, type }) {
  if (!value) return <td className="px-1 py-2 text-center"><span className="text-slate-300 text-xs">-</span></td>;
  return (
    <td className="px-1 py-1.5">
      <button
        className={`w-full min-w-[44px] py-1.5 rounded text-xs font-bold transition-all hover:brightness-110 active:scale-95 ${
          type === "back"
            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
            : type === "lay"
            ? "bg-rose-100 text-rose-800 hover:bg-rose-200"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }`}
      >
        {value}
      </button>
    </td>
  );
}

export default function GameUserDashboard({ activeSection }) {
  const [activeSport, setActiveSport] = useState("Cricket");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = CASINO_GAMES.filter((g) => {
    const matchesCat = activeCategory === "All" || g.category === activeCategory;
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // ── CASINO VIEW ──────────────────────────────────────────────
  if (activeSection === "casino") {
    return (
      <div className="flex-1 overflow-y-auto bg-slate-50">
        {/* Casino Header */}
        <div className="bg-white border-b border-slate-200 px-3 md:px-4 py-2 md:py-3 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-sm md:text-base font-bold text-slate-800">🎰 Casino Games</h2>
            <p className="text-[10px] md:text-xs text-slate-500">{filteredGames.length} games available</p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 w-32 md:w-48"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white border-b border-slate-200 px-3 md:px-4 py-2 flex gap-1.5 md:gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                activeCategory === cat
                  ? "bg-amber-500 text-slate-900 shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Games Grid — 3 cols mobile, more on larger */}
        <div className="p-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-2 md:gap-3">
          {filteredGames.map((game, i) => (
            <button
              key={i}
              className={`relative ${BG_COLORS[i % BG_COLORS.length]} rounded-xl overflow-hidden aspect-[3/4] flex flex-col items-center justify-between p-2 md:p-2.5 hover:scale-105 hover:shadow-md transition-all duration-200 group border border-white/10`}
            >
              {game.hot && (
                <span className="absolute top-1 left-1 bg-amber-500 text-slate-900 text-[7px] md:text-[8px] font-black px-1 md:px-1.5 py-0.5 rounded-full">
                  HOT
                </span>
              )}
              <span className="absolute top-1 right-1 flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              </span>
              <div className="flex-1 flex items-center justify-center">
                <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-200">{game.emoji}</span>
              </div>
              <div className="w-full">
                <p className="text-white text-[8px] md:text-[9px] font-bold text-center leading-tight line-clamp-2">{game.name}</p>
                <p className="text-white/50 text-[7px] md:text-[8px] text-center mt-0.5">{game.category}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── SPORTS VIEW ──────────────────────────────────────────────
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Sport Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 overflow-x-auto scrollbar-hide flex">
        {SPORT_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSport(tab)}
            className={`px-3 md:px-4 py-2 md:py-2.5 text-[10px] md:text-xs font-semibold whitespace-nowrap border-b-2 transition-all flex-shrink-0 ${
              activeSport === tab
                ? "border-amber-500 text-amber-600 bg-amber-50"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="p-3 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {[
          { label: "Live Matches", value: "12", icon: "🟢", color: "text-emerald-600" },
          { label: "Today's Games", value: "48", icon: "📅", color: "text-blue-600" },
          { label: "In-Play Events", value: "7", icon: "⚡", color: "text-amber-600" },
          { label: "Casino Games", value: "70+", icon: "🎰", color: "text-violet-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">{stat.icon}</span>
              <span className={`text-lg md:text-xl font-black ${stat.color}`}>{stat.value}</span>
            </div>
            <p className="text-[10px] md:text-xs text-slate-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Mobile: Card layout */}
      <div className="md:hidden px-3 pb-3 flex flex-col gap-2">
        {MATCHES.map((match, i) => (
          <MatchCard key={i} match={match} />
        ))}
      </div>

      {/* Desktop: Table layout */}
      <div className="hidden md:block px-3 pb-3">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-800 text-slate-300">
                <th className="text-left px-4 py-3 font-semibold w-[40%]">Match</th>
                <th className="px-2 py-3 text-center w-16">Info</th>
                <th className="px-2 py-3 text-center text-blue-300 font-bold" colSpan={2}>1 (Back / Lay)</th>
                <th className="px-2 py-3 text-center text-slate-400 font-bold" colSpan={2}>X (Draw)</th>
                <th className="px-2 py-3 text-center text-rose-300 font-bold" colSpan={2}>2 (Back / Lay)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MATCHES.map((match, i) => (
                <tr key={i} className="hover:bg-amber-50/40 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      {match.live && (
                        <span className="mt-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0 animate-pulse" />
                      )}
                      <div>
                        <p className="font-semibold text-slate-800 group-hover:text-amber-700 cursor-pointer transition-colors leading-snug">
                          {match.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-slate-400 text-[10px]">{match.time}</span>
                          {match.tv && <span className="text-[10px]">📺</span>}
                          {match.bm && <span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-1.5 py-0.5 rounded">BM</span>}
                          {match.fancy && <span className="bg-violet-100 text-violet-700 text-[9px] font-bold px-1.5 py-0.5 rounded">FANCY</span>}
                          {match.esim && <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded">E-SIM</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center px-2 py-3">
                    <button className="text-[10px] text-slate-500 hover:text-amber-600 transition-colors">f</button>
                  </td>
                  <OddsBtn value={match.back1} type="back" />
                  <OddsBtn value={match.lay1} type="lay" />
                  <OddsBtn value={match.backX} type="back" />
                  <OddsBtn value={match.layX} type="lay" />
                  <OddsBtn value={match.back2} type="back" />
                  <OddsBtn value={match.lay2} type="lay" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}