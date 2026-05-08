// import { useState } from "react";
// import Sidebar from "../components/Sidebar/Sidebar";
// import Header from "../components/Header/Header";
// import GameUserDashboard from "../components/GameUserDashboard";

// export default function UserDashboard({ onNavigate }) {
//   const [activeNav, setActiveNav] = useState("HOME");
//   const [sidebarOpen, setSidebarOpen] = useState(false); // default closed on mobile
//   const [activeItem, setActiveItem] = useState("Cricket");
//   const [activeSection, setActiveSection] = useState("sports");
//   const [activeBottomNav, setActiveBottomNav] = useState("home");

//   const handleMenuToggle = () => setSidebarOpen((prev) => !prev);
//   const handleSidebarClose = () => setSidebarOpen(false);

//   return (
//     <div
//       className="flex flex-col h-screen overflow-hidden bg-slate-100"
//       style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif" }}
//     >
//       <Header
//         activeNav={activeNav}
//         setActiveNav={setActiveNav}
//         onMenuToggle={handleMenuToggle}
//         onLoginClick={() => onNavigate("login")}
//         onRegisterClick={() => onNavigate("register")}
//       />

//       <div className="flex flex-1 overflow-hidden relative">
//         {/* Overlay for mobile when sidebar open */}
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black/50 z-30 md:hidden"
//             onClick={handleSidebarClose}
//           />
//         )}

//         {/* Sidebar — drawer on mobile, fixed on desktop */}
//         <div
//           className={`
//             fixed md:static top-0 left-0 h-full z-40 md:z-auto
//             transform transition-transform duration-300 ease-in-out
//             ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//             ${sidebarOpen ? "block" : "hidden md:block"}
//           `}
//           style={{ paddingTop: sidebarOpen ? "0" : undefined }}
//         >
//           <Sidebar
//             isOpen={true}
//             activeItem={activeItem}
//             setActiveItem={(item) => {
//               setActiveItem(item);
//               setSidebarOpen(false); // close on mobile after selection
//             }}
//             activeSection={activeSection}
//             setActiveSection={setActiveSection}
//           />
//         </div>

//         <GameUserDashboard activeSection={activeSection} />
//       </div>

//       {/* Desktop Footer */}
//       <footer className="hidden md:flex bg-slate-800 text-slate-300 text-center py-2 text-[11px] border-t border-slate-700 flex-shrink-0 items-center justify-center gap-0">
//         <span className="text-amber-400 font-bold">24×7 Support</span>
//         <span className="mx-3 text-slate-600">|</span>
//         <span>🔒 100% Safe — SSL Encrypted</span>
//         <span className="mx-3 text-slate-600">|</span>
//         <span>© 2026 DREAMGAME7. All Rights Reserved.</span>
//         <span className="mx-3 text-slate-600">|</span>
//         <span className="text-slate-500">18+ | Play Responsibly</span>
//       </footer>

//       {/* Mobile Bottom Navigation */}
//       <nav className="md:hidden flex-shrink-0 bg-slate-900 border-t border-slate-700 flex items-center justify-around px-2 py-1 safe-area-bottom">
//         {[
//           { id: "home", icon: "🏠", label: "Home" },
//           { id: "sports", icon: "⚽", label: "Sports", section: "sports" },
//           { id: "casino", icon: "🎰", label: "Casino", section: "casino" },
//           { id: "menu", icon: "☰", label: "Menu" },
//         ].map((item) => (
//           <button
//             key={item.id}
//             onClick={() => {
//               if (item.id === "menu") {
//                 handleMenuToggle();
//               } else if (item.section) {
//                 setActiveSection(item.section);
//                 setActiveBottomNav(item.id);
//               } else {
//                 setActiveBottomNav(item.id);
//               }
//             }}
//             className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
//               activeBottomNav === item.id || (item.id === "menu" && sidebarOpen)
//                 ? "bg-amber-500/20 text-amber-400"
//                 : "text-slate-400 hover:text-white"
//             }`}
//           >
//             <span className="text-lg leading-none">{item.icon}</span>
//             <span className="text-[9px] font-semibold tracking-wide">{item.label}</span>
//           </button>
//         ))}
//       </nav>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import GameUserDashboard from "../components/GameUserDashboard";
import ZerosCrosses from "../components/games/Zeroscrosses";

export default function UserDashboard({ isLoggedIn = false, user = null, onLogout }) {
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState(isLoggedIn ? "LUCKY 7" : "HOME");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Cricket");
  const [activeSection, setActiveSection] = useState("sports");
  const [activeBottomNav, setActiveBottomNav] = useState(isLoggedIn ? "game" : "home");
  const [balance, setBalance] = useState(user?.balance ?? 200000);

  const showZerosCrosses = activeNav === "LUCKY 7";

  const handleMenuToggle = () => setSidebarOpen((prev) => !prev);
  const handleSidebarClose = () => setSidebarOpen(false);

  const handleLogout = () => {
    onLogout?.();
    navigate("/auth/login", { replace: true });
  };

  return (
    <div
      className="flex flex-col h-screen overflow-hidden bg-slate-100"
      style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif" }}
    >
      <Header
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onMenuToggle={handleMenuToggle}
        isLoggedIn={isLoggedIn}
        user={user ? { ...user, balance } : undefined}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={handleSidebarClose}
          />
        )}

        <div
          className={`
            fixed md:static top-0 left-0 h-full z-40 md:z-auto
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            ${sidebarOpen ? "block" : "hidden md:block"}
          `}
        >
          <Sidebar
            isOpen={true}
            activeItem={activeItem}
            setActiveItem={(item) => {
              setActiveItem(item);
              setSidebarOpen(false);
            }}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        {showZerosCrosses ? (
          <ZerosCrosses userBalance={balance} onBalanceChange={setBalance} />
        ) : (
          <GameUserDashboard activeSection={activeSection} />
        )}
      </div>

      <footer className="hidden md:flex bg-slate-800 text-slate-300 text-center py-2 text-[11px] border-t border-slate-700 flex-shrink-0 items-center justify-center gap-0">
        <span className="text-amber-400 font-bold">24×7 Support</span>
        <span className="mx-3 text-slate-600">|</span>
        <span>🔒 100% Safe — SSL Encrypted</span>
        <span className="mx-3 text-slate-600">|</span>
        <span>© 2026 DREAMGAME7. All Rights Reserved.</span>
        <span className="mx-3 text-slate-600">|</span>
        <span className="text-slate-500">18+ | Play Responsibly</span>
      </footer>

      <nav className="md:hidden flex-shrink-0 bg-slate-900 border-t border-slate-700 flex items-center justify-around px-2 py-1">
        {[
          { id: "home",   icon: "🏠",  label: "Home",   nav: "HOME" },
          { id: "sports", icon: "⚽",  label: "Sports", section: "sports", nav: "HOME" },
          { id: "casino", icon: "🎰",  label: "Casino", section: "casino", nav: "HOME" },
          { id: "game",   icon: "✕○", label: "X-O",    nav: "LUCKY 7" },
          { id: "menu",   icon: "☰",  label: "Menu" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === "menu") {
                handleMenuToggle();
              } else {
                setActiveNav(item.nav ?? "HOME");
                setActiveBottomNav(item.id);
                if (item.section) setActiveSection(item.section);
              }
            }}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
              activeBottomNav === item.id || (item.id === "menu" && sidebarOpen)
                ? "bg-amber-500/20 text-amber-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <span className="text-base leading-none">{item.icon}</span>
            <span className="text-[9px] font-semibold tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}