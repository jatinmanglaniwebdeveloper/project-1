import { useState } from "react";

const SIDEBAR_DATA = [
  {
    section: "Racing Sports",
    icon: "🏇",
    color: "text-rose-600",
    items: ["Horse Racing", "Greyhound Racing"],
  },
  {
    section: "Casino & Games",
    icon: "🎰",
    color: "text-violet-600",
    items: [
      "Our Casino",
      "Our VIP Casino",
      "Our Premium Casino",
      "Our Virtual",
      "Live Casino",
      "Slot Game",
      "Fantasy Game",
    ],
  },
  {
    section: "All Sports",
    icon: "🏆",
    color: "text-amber-600",
    items: [
      "Politics", "Cricket", "Football", "Tennis", "Table Tennis",
      "Badminton", "Esoccer", "Basketball", "Volleyball", "Snooker",
      "Ice Hockey", "E Games", "Futsal", "Handball", "Kabaddi",
      "Golf", "Rugby League", "Boxing", "Beach Volleyball",
      "Mixed Martial Arts", "MotoGP", "Chess", "Cycling",
      "Motorbikes", "Athletics", "Basketball 3X3", "Sumo",
      "Virtual Sports", "Motor Sports", "Baseball", "Rugby Union",
      "Darts", "American Football", "Soccer", "Esports",
      "Boat Racing", "Wrestling",
    ],
  },
];

const SPORT_ICONS = {
  Cricket: "🏏", Football: "⚽", Tennis: "🎾", Basketball: "🏀",
  Volleyball: "🏐", Badminton: "🏸", Snooker: "🎱", Boxing: "🥊",
  Golf: "⛳", Chess: "♟️", Cycling: "🚴", Kabaddi: "🤼",
  "Ice Hockey": "🏒", Baseball: "⚾", Wrestling: "🤼", Politics: "🗳️",
  "Our Casino": "🎰", "Our VIP Casino": "💎", "Our Premium Casino": "👑",
  "Live Casino": "🎥", "Slot Game": "🎰", "Fantasy Game": "🧙",
  "Horse Racing": "🏇", "Greyhound Racing": "🐕",
};

export default function Sidebar({ isOpen, activeItem, setActiveItem, activeSection, setActiveSection }) {
  const [expanded, setExpanded] = useState({
    "Racing Sports": true,
    "Casino & Games": false,
    "All Sports": true,
  });

  if (!isOpen) return null;

  return (
    <aside className="w-56 md:w-56 bg-white border-r border-slate-200 h-full flex flex-col shadow-sm flex-shrink-0 overflow-hidden">

      {/* Sports / Casino Toggle */}
      <div className="flex border-b border-slate-200 p-2 gap-1.5 flex-shrink-0">
        <button
          onClick={() => setActiveSection("sports")}
          className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${
            activeSection === "sports"
              ? "bg-slate-800 text-white shadow-sm"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          ⚽ Sports
        </button>
        <button
          onClick={() => setActiveSection("casino")}
          className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${
            activeSection === "casino"
              ? "bg-amber-500 text-slate-900 shadow-sm"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          🎰 Casino
        </button>
      </div>

      {/* Quick Access */}
      <div className="px-2 py-2 border-b border-slate-100 flex-shrink-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1.5">Quick Access</p>
        <div className="grid grid-cols-2 gap-1">
          {["🏏 IPL", "🎲 Live", "⚡ In-Play", "🔥 Popular"].map((item) => (
            <button
              key={item}
              className="text-[10px] py-1.5 px-2 bg-slate-50 hover:bg-amber-50 hover:text-amber-700 text-slate-600 rounded-md font-semibold border border-slate-200 hover:border-amber-300 transition-all text-left"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Nav */}
      <nav className="flex-1 overflow-y-auto py-1">
        {SIDEBAR_DATA.map(({ section, icon, color, items }) => (
          <div key={section}>
            <button
              onClick={() => setExpanded((e) => ({ ...e, [section]: !e[section] }))}
              className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{icon}</span>
                <span className={`text-xs font-bold ${color}`}>{section}</span>
              </div>
              <span className="text-slate-400 text-xs group-hover:text-slate-600 transition-colors">
                {expanded[section] ? "▲" : "▼"}
              </span>
            </button>

            {expanded[section] && (
              <div className="pb-1">
                {items.map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveItem(item)}
                    className={`w-full flex items-center gap-2.5 px-4 py-2 text-xs transition-all ${
                      activeItem === item
                        ? "bg-amber-50 text-amber-700 font-semibold border-r-2 border-amber-500"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="text-sm w-4 text-center flex-shrink-0">
                      {SPORT_ICONS[item] || "•"}
                    </span>
                    <span className="truncate">{item}</span>
                    {["Cricket", "Football", "Tennis"].includes(item) && (
                      <span className="ml-auto bg-emerald-100 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">
                        LIVE
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="mx-3 border-b border-slate-100" />
          </div>
        ))}
      </nav>

      {/* Support Banner */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 flex-shrink-0">
        <div className="bg-slate-800 rounded-lg p-3 text-center">
          <p className="text-[10px] text-slate-400 font-semibold">24×7 SUPPORT</p>
          <p className="text-amber-400 text-xs font-bold mt-0.5">📞 Help Center</p>
          <div className="mt-2 flex items-center justify-center">
            <span className="text-[9px] text-slate-500">🔒 100% Secure & Encrypted</span>
          </div>
        </div>
      </div>
    </aside>
  );
}