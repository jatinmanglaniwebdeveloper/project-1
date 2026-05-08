// import { useState } from "react";
// import { Link } from "react-router-dom";

// const NAV_TABS = [
//   { label: "HOME", icon: "🏠" },
//   { label: "LOTTERY", icon: "🎰" },
//   { label: "CRICKET", icon: "🏏" },
//   { label: "TENNIS", icon: "🎾" },
//   { label: "FOOTBALL", icon: "⚽" },
//   { label: "TABLE TENNIS", icon: "🏓" },
//   { label: "BACCARAT", icon: "🃏" },
//   { label: "32 CARDS", icon: "🎴" },
//   { label: "TEENPATTI", icon: "♠️" },
//   { label: "POKER", icon: "🂡" },
//   { label: "LUCKY 7", icon: "7️⃣" },
//   { label: "CRASH", icon: "🚀" },
// ];

// const LIVE_TICKERS = [
//   "🏏 Lucknow Super Giants v R C Bengaluru",
//   "⚽ Aston Villa v Nottm Forest",
//   "🎾 Ha Medjedovic v Royer",
//   "⚽ Freiburg v Braga",
//   "🏏 Mumbai Indians v Sunrisers Hyderabad",
// ];

// export default function Header({ activeNav, setActiveNav, onMenuToggle }) {
//   const [tickerPaused, setTickerPaused] = useState(false);

//   return (
//     <header className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">

//       {/* Top utility bar — desktop only */}
//       <div className="hidden md:flex bg-slate-800 px-4 py-1.5 items-center justify-between">
//         <div className="flex items-center gap-6 text-xs text-slate-300">
//           <span className="flex items-center gap-1.5">
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
//             Live Cricket Predictions Available
//           </span>
//           <span className="text-amber-400 font-medium">🎁 5% Welcome Bonus on First Deposit</span>
//           <Link to="/auth/register" className="text-slate-300 hover:text-amber-400 transition-colors">
//             Join Now
//           </Link>
//         </div>
//         <div className="flex items-center gap-3 text-xs">
//           <div className="flex items-center gap-2 bg-slate-700 rounded px-3 py-1">
//             <span className="text-slate-400">Balance:</span>
//             <span className="text-emerald-400 font-bold">₹1,500.00</span>
//           </div>
//           <div className="flex items-center gap-2 bg-slate-700 rounded px-3 py-1">
//             <span className="text-slate-400">Exp:</span>
//             <span className="text-white font-semibold">0</span>
//           </div>
//           <button className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-3 py-1 rounded text-xs transition-colors">
//             DEMO
//           </button>
//         </div>
//       </div>

//       {/* Brand Row */}
//       <div className="bg-white border-b border-slate-100 px-3 md:px-4 py-2 md:py-3 flex items-center justify-between gap-2">

//         {/* Left: Hamburger + Logo */}
//         <div className="flex items-center gap-2 flex-shrink-0">
//           <button
//             onClick={onMenuToggle}
//             className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//           <Link to="/" className="flex-shrink-0 no-underline">
//             <span
//               className="text-lg sm:text-xl md:text-2xl font-black select-none"
//               style={{ fontFamily: "'Georgia', serif" }}
//             >
//               <span className="text-slate-800">DREAM</span>
//               <span className="text-amber-500">GAME</span>
//               <span
//                 className="text-white bg-amber-500 px-1 py-0.5 rounded ml-0.5"
//                 style={{ fontFamily: "monospace" }}
//               >
//                 7
//               </span>
//             </span>
//           </Link>
//         </div>

//         {/* Center: Search desktop only */}
//         <div className="hidden md:block flex-1 max-w-xs mx-4 relative">
//           <input
//             type="text"
//             placeholder="Search games, matches..."
//             className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
//           />
//           <svg className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>

//         {/* Right: Actions — ALWAYS visible, never hidden */}
//         <div className="flex items-center gap-1.5 flex-shrink-0">
//           {/* Mobile balance */}
//           <div className="md:hidden bg-slate-800 rounded-lg px-2 py-1.5">
//             <span className="text-emerald-400 font-bold text-[11px]">₹1,500</span>
//           </div>

//           {/* Rules desktop */}
//           <button className="hidden md:block text-sm text-slate-600 hover:text-amber-600 font-medium transition-colors mr-1">
//             Rules
//           </button>

//           {/* Login */}
//           <Link
//             to="/auth/login"
//             className="flex-shrink-0 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
//             style={{ fontSize: "12px", padding: "7px 12px", whiteSpace: "nowrap" }}
//           >
//             Login
//           </Link>

//           {/* Register */}
//           <Link
//             to="/auth/register"
//             className="flex-shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-colors"
//             style={{ fontSize: "12px", padding: "7px 12px", whiteSpace: "nowrap" }}
//           >
//             Register
//           </Link>
//         </div>
//       </div>

//       {/* Nav Tabs */}
//       <div className="bg-slate-800 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
//         <div className="flex" style={{ minWidth: "max-content" }}>
//           {NAV_TABS.map((tab) => (
//             <button
//               key={tab.label}
//               onClick={() => setActiveNav(tab.label)}
//               className={`flex items-center gap-1 px-3 md:px-4 py-2 md:py-2.5 text-[10px] md:text-xs font-bold whitespace-nowrap transition-all border-b-2 flex-shrink-0 ${
//                 activeNav === tab.label
//                   ? "border-amber-400 text-amber-400 bg-slate-700"
//                   : "border-transparent text-slate-300 hover:text-white hover:bg-slate-700/50"
//               }`}
//             >
//               <span>{tab.icon}</span>
//               <span className="hidden sm:inline">{tab.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Live Ticker */}
//       <div
//         className="bg-amber-50 border-b border-amber-200 px-3 py-1.5 flex items-center gap-2 overflow-hidden"
//         onMouseEnter={() => setTickerPaused(true)}
//         onMouseLeave={() => setTickerPaused(false)}
//       >
//         <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded flex-shrink-0 tracking-wider">
//           LIVE
//         </span>
//         <div className="overflow-hidden flex-1">
//           <div
//             className="flex gap-6 text-[10px] md:text-xs text-slate-600 font-medium"
//             style={{
//               animation: tickerPaused ? "none" : "ticker 25s linear infinite",
//               whiteSpace: "nowrap",
//             }}
//           >
//             {[...LIVE_TICKERS, ...LIVE_TICKERS].map((t, i) => (
//               <span key={i} className="cursor-pointer hover:text-amber-600 transition-colors flex-shrink-0">
//                 {t}
//               </span>
//             ))}
//           </div>
//         </div>
//         <style>{`
//           @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
//           nav-scroll::-webkit-scrollbar { display: none; }
//         `}</style>
//       </div>
//     </header>
//   );
// }

import { useState } from "react";
import { Link } from "react-router-dom";

const NAV_TABS = [
  { label: "HOME", icon: "🏠" },
  { label: "LOTTERY", icon: "🎰" },
  { label: "CRICKET", icon: "🏏" },
  { label: "TENNIS", icon: "🎾" },
  { label: "FOOTBALL", icon: "⚽" },
  { label: "TABLE TENNIS", icon: "🏓" },
  { label: "BACCARAT", icon: "🃏" },
  { label: "32 CARDS", icon: "🎴" },
  { label: "TEENPATTI", icon: "♠️" },
  { label: "POKER", icon: "🂡" },
  { label: "LUCKY 7", icon: "7️⃣" },
  { label: "CRASH", icon: "🚀" },
];

const LIVE_TICKERS = [
  "🏏 Lucknow Super Giants v R C Bengaluru",
  "⚽ Aston Villa v Nottm Forest",
  "🎾 Ha Medjedovic v Royer",
  "⚽ Freiburg v Braga",
  "🏏 Mumbai Indians v Sunrisers Hyderabad",
];

// isLoggedIn: bool, user: { username, balance, exp }
export default function Header({ activeNav, setActiveNav, onMenuToggle, isLoggedIn = false, user = { username: "jio1115", balance: 200000, exp: 0 }, onLogout }) {
  const [tickerPaused, setTickerPaused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50" style={{ fontFamily: "'Segoe UI', sans-serif" }}>

      {/* ── TOP BAR ── */}
      {isLoggedIn ? (
        /* POST-LOGIN top bar — matches image 2 */
        <div
          className="flex items-center justify-between px-3 md:px-5 py-2"
          style={{ background: "linear-gradient(90deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)" }}
        >
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 no-underline">
            <span
              className="text-xl md:text-2xl font-black select-none tracking-widest"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              <span style={{ color: "#f59e0b" }}>DREAM</span>
              <span style={{ color: "#f59e0b" }}>GAME</span>
              <span
                style={{
                  color: "#1a1a2e",
                  background: "#f59e0b",
                  padding: "1px 6px",
                  borderRadius: "4px",
                  marginLeft: "2px",
                  fontFamily: "monospace",
                }}
              >
                7
              </span>
            </span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search icon */}
            <button className="hidden md:flex items-center justify-center w-8 h-8 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Rules */}
            <button className="hidden md:block text-xs font-semibold transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>
              Rules
            </button>

            {/* Deposit */}
            <button
              className="text-xs font-black px-3 py-1.5 rounded-lg transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#22c55e", color: "#fff" }}
            >
              Deposit
            </button>

            {/* Withdraw */}
            <button
              className="text-xs font-black px-3 py-1.5 rounded-lg transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#ef4444", color: "#fff" }}
            >
              Withdraw
            </button>

            {/* Balance + Exp + Username */}
            <div
              className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <div className="text-right">
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>Balance:</p>
                <p className="text-xs font-black" style={{ color: "#22c55e" }}>
                  {user.balance?.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="w-px h-6" style={{ background: "rgba(255,255,255,0.12)" }} />
              <div className="text-right">
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>Exp:</p>
                <p className="text-xs font-black text-white">{user.exp ?? 0}</p>
              </div>
              <div className="w-px h-6" style={{ background: "rgba(255,255,255,0.12)" }} />
              {/* Username dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-1 text-xs font-bold transition-colors"
                  style={{ color: "#f59e0b" }}
                >
                  {user.username}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-40 rounded-xl overflow-hidden shadow-2xl z-50"
                    style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {[
                      { icon: "👤", label: "Profile" },
                      { icon: "📜", label: "Bet History" },
                      { icon: "💳", label: "Transactions" },
                      { icon: "🔒", label: "Change Password" },
                    ].map((item) => (
                      <button
                        key={item.label}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition-colors hover:bg-amber-500/10"
                        style={{ color: "rgba(255,255,255,0.7)" }}
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                    <div className="mx-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }} />
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-colors hover:bg-red-500/10"
                      style={{ color: "#f87171" }}
                    >
                      <span>🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile: compact balance */}
            <div className="md:hidden flex items-center gap-1.5">
              <div
                className="px-2 py-1.5 rounded-lg"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <span className="text-[11px] font-black" style={{ color: "#22c55e" }}>
                  ₹{(user.balance / 1000).toFixed(0)}K
                </span>
              </div>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="text-[11px] font-bold"
                style={{ color: "#f59e0b" }}
              >
                {user.username} ▾
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* PRE-LOGIN top bar */
        <>
          <div className="hidden md:flex bg-slate-800 px-4 py-1.5 items-center justify-between">
            <div className="flex items-center gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                Live Cricket Predictions Available
              </span>
              <span className="text-amber-400 font-medium">🎁 5% Welcome Bonus on First Deposit</span>
              <Link to="/auth/register" className="text-slate-300 hover:text-amber-400 transition-colors">
                Join Now
              </Link>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-2 bg-slate-700 rounded px-3 py-1">
                <span className="text-slate-400">Balance:</span>
                <span className="text-emerald-400 font-bold">₹1,500.00</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-700 rounded px-3 py-1">
                <span className="text-slate-400">Exp:</span>
                <span className="text-white font-semibold">0</span>
              </div>
              <button className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-3 py-1 rounded text-xs transition-colors">
                DEMO
              </button>
            </div>
          </div>

          <div className="bg-white border-b border-slate-100 px-3 md:px-4 py-2 md:py-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={onMenuToggle} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link to="/" className="flex-shrink-0 no-underline">
                <span className="text-lg sm:text-xl md:text-2xl font-black select-none" style={{ fontFamily: "'Georgia', serif" }}>
                  <span className="text-slate-800">DREAM</span>
                  <span className="text-amber-500">GAME</span>
                  <span className="text-white bg-amber-500 px-1 py-0.5 rounded ml-0.5" style={{ fontFamily: "monospace" }}>7</span>
                </span>
              </Link>
            </div>
            <div className="hidden md:block flex-1 max-w-xs mx-4 relative">
              <input type="text" placeholder="Search games, matches..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400" />
              <svg className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="md:hidden bg-slate-800 rounded-lg px-2 py-1.5">
                <span className="text-emerald-400 font-bold text-[11px]">₹1,500</span>
              </div>
              <button className="hidden md:block text-sm text-slate-600 hover:text-amber-600 font-medium transition-colors mr-1">Rules</button>
              <Link to="/auth/login" className="flex-shrink-0 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors" style={{ fontSize: "12px", padding: "7px 12px", whiteSpace: "nowrap" }}>
                Login
              </Link>
              <Link to="/auth/register" className="flex-shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-colors" style={{ fontSize: "12px", padding: "7px 12px", whiteSpace: "nowrap" }}>
                Register
              </Link>
            </div>
          </div>
        </>
      )}

      {/* ── NAV TABS ── */}
      <div
        className="overflow-x-auto"
        style={{ background: isLoggedIn ? "#d97706" : "#1e293b", scrollbarWidth: "none" }}
      >
        <div className="flex" style={{ minWidth: "max-content" }}>
          {/* Hamburger for logged-in mobile */}
          {isLoggedIn && (
            <button
              onClick={onMenuToggle}
              className="flex items-center justify-center px-3 py-2 transition-colors"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          {NAV_TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveNav(tab.label)}
              className={`flex items-center gap-1 px-3 md:px-4 py-2 md:py-2.5 text-[10px] md:text-xs font-bold whitespace-nowrap transition-all border-b-2 flex-shrink-0 ${
                activeNav === tab.label
                  ? isLoggedIn
                    ? "border-white text-white bg-amber-600"
                    : "border-amber-400 text-amber-400 bg-slate-700"
                  : isLoggedIn
                  ? "border-transparent text-amber-100 hover:text-white hover:bg-amber-600/50"
                  : "border-transparent text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}

          {/* Live Cricket Predictions ticker for logged-in (right side of nav) */}
          {isLoggedIn && (
            <div className="flex items-center ml-4 gap-2 px-3 overflow-hidden max-w-xs">
              <span className="text-[9px] font-black text-amber-200 whitespace-nowrap animate-pulse">📡 Live Cricket Predictions</span>
            </div>
          )}
        </div>
      </div>

      {/* ── LIVE TICKER (pre-login only) ── */}
      {!isLoggedIn && (
        <div
          className="bg-amber-50 border-b border-amber-200 px-3 py-1.5 flex items-center gap-2 overflow-hidden"
          onMouseEnter={() => setTickerPaused(true)}
          onMouseLeave={() => setTickerPaused(false)}
        >
          <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded flex-shrink-0 tracking-wider">LIVE</span>
          <div className="overflow-hidden flex-1">
            <div
              className="flex gap-6 text-[10px] md:text-xs text-slate-600 font-medium"
              style={{
                animation: tickerPaused ? "none" : "ticker 25s linear infinite",
                whiteSpace: "nowrap",
              }}
            >
              {[...LIVE_TICKERS, ...LIVE_TICKERS].map((t, i) => (
                <span key={i} className="cursor-pointer hover:text-amber-600 transition-colors flex-shrink-0">{t}</span>
              ))}
            </div>
          </div>
          <style>{`
            @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          `}</style>
        </div>
      )}
    </header>
  );
}