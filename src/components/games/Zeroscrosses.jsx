import { useState, useEffect } from "react";

// ─── Minimax AI ────────────────────────────────────────────────
function checkWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (const [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a,b,c] };
    }
  }
  if (board.every(Boolean)) return { winner: "draw", line: [] };
  return null;
}

function minimax(board, isMax, depth = 0) {
  const result = checkWinner(board);
  if (result) {
    if (result.winner === "O") return 10 - depth;
    if (result.winner === "X") return depth - 10;
    return 0;
  }
  const scores = [];
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = isMax ? "O" : "X";
      scores.push(minimax(board, !isMax, depth + 1));
      board[i] = null;
    }
  }
  return isMax ? Math.max(...scores) : Math.min(...scores);
}

function getBestMove(board) {
  let best = -Infinity, bestIdx = -1;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = "O";
      const score = minimax(board, false);
      board[i] = null;
      if (score > best) { best = score; bestIdx = i; }
    }
  }
  return bestIdx;
}

// ─── Bet options ───────────────────────────────────────────────
const BET_OPTIONS = [10, 20, 50, 100, 200, 500];
const DIFFICULTY = ["Easy", "Medium", "Hard"];

// ─── Cell ─────────────────────────────────────────────────────
function Cell({ value, onClick, highlight, disabled, idx }) {
  const colors = {
    X: { text: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "#f59e0b" },
    O: { text: "#06b6d4", bg: "rgba(6,182,212,0.08)", border: "#06b6d4" },
    null: { text: "transparent", bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.08)" },
  };
  const c = colors[value] ?? colors[null];

  return (
    <button
      onClick={onClick}
      disabled={disabled || !!value}
      className="relative flex items-center justify-center rounded-2xl transition-all duration-200 active:scale-95"
      style={{
        aspectRatio: "1",
        background: highlight ? "rgba(245,158,11,0.18)" : c.bg,
        border: `2px solid ${highlight ? "#f59e0b" : c.border}`,
        boxShadow: highlight ? "0 0 20px rgba(245,158,11,0.4)" : value ? `0 0 12px ${c.border}30` : "none",
        cursor: value || disabled ? "default" : "pointer",
      }}
    >
      {value === "X" && (
        <svg viewBox="0 0 40 40" className="w-8 h-8 md:w-12 md:h-12" style={{ filter: "drop-shadow(0 0 8px #f59e0b)" }}>
          <line x1="8" y1="8" x2="32" y2="32" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
          <line x1="32" y1="8" x2="8" y2="32" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
        </svg>
      )}
      {value === "O" && (
        <svg viewBox="0 0 40 40" className="w-8 h-8 md:w-12 md:h-12" style={{ filter: "drop-shadow(0 0 8px #06b6d4)" }}>
          <circle cx="20" cy="20" r="12" fill="none" stroke="#06b6d4" strokeWidth="4" />
        </svg>
      )}
      {!value && !disabled && (
        <span className="text-slate-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity select-none">·</span>
      )}
    </button>
  );
}

// ─── Main Game ─────────────────────────────────────────────────
export default function ZerosCrosses({ userBalance = 200000, onBalanceChange }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [result, setResult] = useState(null); // null | { winner, line, payout }
  const [betAmount, setBetAmount] = useState(50);
  const [difficulty, setDifficulty] = useState("Hard");
  const [gamePhase, setGamePhase] = useState("bet"); // bet | playing | over
  const [balance, setBalance] = useState(userBalance);
  const [history, setHistory] = useState([]); // [{ result, bet, payout }]
  const [aiThinking, setAiThinking] = useState(false);
  const [customBet, setCustomBet] = useState("");

  // ── AI Move ────────────────────────────────────────────────
  useEffect(() => {
    if (gamePhase !== "playing" || isPlayerTurn || result) return;

    setAiThinking(true);
    const delay = difficulty === "Easy" ? 400 : difficulty === "Medium" ? 600 : 800;

    const timer = setTimeout(() => {
      const newBoard = [...board];
      let idx;

      if (difficulty === "Easy") {
        // random empty cell
        const empty = newBoard.map((v, i) => !v ? i : -1).filter(i => i >= 0);
        idx = empty[Math.floor(Math.random() * empty.length)];
      } else if (difficulty === "Medium") {
        // 50% chance optimal, 50% random
        if (Math.random() > 0.5) {
          idx = getBestMove([...newBoard]);
        } else {
          const empty = newBoard.map((v, i) => !v ? i : -1).filter(i => i >= 0);
          idx = empty[Math.floor(Math.random() * empty.length)];
        }
      } else {
        idx = getBestMove([...newBoard]);
      }

      if (idx !== undefined && idx >= 0) {
        newBoard[idx] = "O";
        setBoard(newBoard);

        const res = checkWinner(newBoard);
        if (res) {
          finishGame(res, newBoard);
        } else {
          setIsPlayerTurn(true);
        }
      }
      setAiThinking(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [isPlayerTurn, gamePhase, board]);

  function finishGame(res, finalBoard) {
    let payout = 0;
    let label = "";
    if (res.winner === "X") {
      payout = betAmount * 2;
      label = "win";
    } else if (res.winner === "draw") {
      payout = betAmount;
      label = "draw";
    } else {
      payout = 0;
      label = "loss";
    }

    const newBalance = balance - betAmount + payout;
    setBalance(newBalance);
    onBalanceChange?.(newBalance);

    setResult({ ...res, payout, label });
    setHistory(prev => [{ result: label, bet: betAmount, payout, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 9)]);
    setGamePhase("over");
  }

  function handleCellClick(idx) {
    if (!isPlayerTurn || board[idx] || gamePhase !== "playing" || result) return;

    const newBoard = [...board];
    newBoard[idx] = "X";
    setBoard(newBoard);

    const res = checkWinner(newBoard);
    if (res) {
      finishGame(res, newBoard);
    } else {
      setIsPlayerTurn(false);
    }
  }

  function startGame() {
    if (betAmount > balance) return;
    setBoard(Array(9).fill(null));
    setResult(null);
    setIsPlayerTurn(true);
    setGamePhase("playing");
    setAiThinking(false);
  }

  function resetToLobby() {
    setBoard(Array(9).fill(null));
    setResult(null);
    setIsPlayerTurn(true);
    setGamePhase("bet");
  }

  const effectiveBet = customBet ? parseInt(customBet) || 0 : betAmount;

  return (
    <div
      className="flex-1 overflow-y-auto flex flex-col items-center px-3 py-4 md:py-6 min-h-0"
      style={{ background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" }}
    >
      <style>{`
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(245,158,11,0.3); }
          50% { box-shadow: 0 0 40px rgba(245,158,11,0.7); }
        }
        @keyframes result-pop {
          0% { transform: scale(0.7) translateY(20px); opacity: 0; }
          70% { transform: scale(1.05) translateY(-4px); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes thinking-bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
        .result-pop { animation: result-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .thinking-dot { animation: thinking-bounce 1.2s ease-in-out infinite; }
        .thinking-dot:nth-child(2) { animation-delay: 0.2s; }
        .thinking-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      {/* Header */}
      <div className="w-full max-w-lg mb-4 text-center">
        <h2 className="text-xl md:text-2xl font-black tracking-widest" style={{ color: "#f59e0b", fontFamily: "'Georgia', serif" }}>
          ✕ ZEROS & CROSSES ○
        </h2>
        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          You are <span style={{ color: "#f59e0b", fontWeight: "bold" }}>✕ X</span> · AI is <span style={{ color: "#06b6d4", fontWeight: "bold" }}>○ O</span>
        </p>
      </div>

      <div className="w-full max-w-lg flex flex-col gap-4">

        {/* Balance bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>YOUR BALANCE</p>
            <p className="text-sm font-black" style={{ color: "#22c55e" }}>
              ₹{balance.toLocaleString("en-IN")}
            </p>
          </div>
          {gamePhase === "playing" && (
            <div>
              <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>BET PLACED</p>
              <p className="text-sm font-black" style={{ color: "#f59e0b" }}>₹{effectiveBet}</p>
            </div>
          )}
          <div className="text-right">
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>WIN POTENTIAL</p>
            <p className="text-sm font-black" style={{ color: "#a78bfa" }}>₹{(effectiveBet * 2).toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* Bet + Difficulty Setup (only in bet phase) */}
        {gamePhase === "bet" && (
          <div
            className="rounded-2xl p-4 flex flex-col gap-3"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Difficulty */}
            <div>
              <p className="text-[10px] font-bold mb-2 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
                Difficulty
              </p>
              <div className="flex gap-2">
                {DIFFICULTY.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{
                      background: difficulty === d
                        ? d === "Easy" ? "#22c55e" : d === "Medium" ? "#f59e0b" : "#ef4444"
                        : "rgba(255,255,255,0.06)",
                      color: difficulty === d ? "#fff" : "rgba(255,255,255,0.4)",
                      border: difficulty === d ? "none" : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {d === "Easy" ? "😊 Easy" : d === "Medium" ? "😐 Medium" : "🤖 Hard"}
                  </button>
                ))}
              </div>
            </div>

            {/* Bet Amount */}
            <div>
              <p className="text-[10px] font-bold mb-2 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>
                Bet Amount
              </p>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {BET_OPTIONS.map((b) => (
                  <button
                    key={b}
                    onClick={() => { setBetAmount(b); setCustomBet(""); }}
                    className="py-2 rounded-xl text-xs font-bold transition-all"
                    style={{
                      background: betAmount === b && !customBet ? "linear-gradient(90deg,#d97706,#f59e0b)" : "rgba(255,255,255,0.06)",
                      color: betAmount === b && !customBet ? "#fff" : "rgba(255,255,255,0.5)",
                      border: betAmount === b && !customBet ? "none" : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    ₹{b}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Custom amount..."
                value={customBet}
                onChange={(e) => setCustomBet(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 text-sm font-medium text-white placeholder-slate-500 focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: customBet ? "1.5px solid #f59e0b" : "1.5px solid rgba(255,255,255,0.1)",
                  caretColor: "#f59e0b",
                }}
              />
            </div>

            {/* Start button */}
            <button
              onClick={startGame}
              disabled={effectiveBet <= 0 || effectiveBet > balance}
              className="w-full py-3.5 rounded-xl font-black text-sm tracking-widest uppercase transition-all hover:opacity-90 active:scale-95 disabled:opacity-40"
              style={{
                background: "linear-gradient(90deg, #d97706 0%, #f59e0b 100%)",
                color: "#fff",
                boxShadow: "0 4px 24px rgba(245,158,11,0.4)",
              }}
            >
              🎮 START GAME · BET ₹{effectiveBet}
            </button>

            {effectiveBet > balance && (
              <p className="text-center text-xs" style={{ color: "#f87171" }}>Insufficient balance</p>
            )}
          </div>
        )}

        {/* ─ GAME BOARD ─ */}
        {(gamePhase === "playing" || gamePhase === "over") && (
          <div className="flex flex-col items-center gap-3">
            {/* Status */}
            <div
              className="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {gamePhase === "playing" && !result && (
                isPlayerTurn ? (
                  <><span style={{ color: "#f59e0b" }}>✕</span><span className="text-white">Your turn</span></>
                ) : aiThinking ? (
                  <div className="flex items-center gap-2">
                    <span style={{ color: "#06b6d4" }}>○</span>
                    <span className="text-white">AI thinking</span>
                    <div className="flex gap-1">
                      {[0,1,2].map(i => (
                        <div key={i} className="thinking-dot w-1.5 h-1.5 rounded-full" style={{ background: "#06b6d4", animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <><span style={{ color: "#06b6d4" }}>○</span><span className="text-white">AI's turn</span></>
                )
              )}
              {gamePhase === "over" && result && (
                result.label === "win" ? <><span>🏆</span><span style={{ color: "#22c55e" }}>You Won!</span></> :
                result.label === "draw" ? <><span>🤝</span><span style={{ color: "#f59e0b" }}>Draw!</span></> :
                <><span>😔</span><span style={{ color: "#f87171" }}>AI Won</span></>
              )}
            </div>

            {/* Grid */}
            <div
              className="grid gap-2 p-3 rounded-2xl w-full max-w-[300px]"
              style={{
                gridTemplateColumns: "repeat(3, 1fr)",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                animation: gamePhase === "over" && result ? "glow-pulse 2s ease-in-out infinite" : "none",
              }}
            >
              {board.map((val, idx) => (
                <Cell
                  key={idx}
                  idx={idx}
                  value={val}
                  onClick={() => handleCellClick(idx)}
                  highlight={result?.line?.includes(idx)}
                  disabled={gamePhase === "over" || !isPlayerTurn || aiThinking}
                />
              ))}
            </div>

            {/* Result overlay */}
            {gamePhase === "over" && result && (
              <div
                className="result-pop w-full max-w-[300px] rounded-2xl p-4 text-center"
                style={{
                  background: result.label === "win"
                    ? "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))"
                    : result.label === "draw"
                    ? "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))"
                    : "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))",
                  border: `1px solid ${result.label === "win" ? "rgba(34,197,94,0.3)" : result.label === "draw" ? "rgba(245,158,11,0.3)" : "rgba(239,68,68,0.3)"}`,
                }}
              >
                <div className="text-3xl mb-1">
                  {result.label === "win" ? "🏆" : result.label === "draw" ? "🤝" : "😔"}
                </div>
                <p className="font-black text-base mb-1" style={{
                  color: result.label === "win" ? "#22c55e" : result.label === "draw" ? "#f59e0b" : "#f87171"
                }}>
                  {result.label === "win" ? "YOU WIN!" : result.label === "draw" ? "IT'S A DRAW" : "AI WINS"}
                </p>
                <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {result.label === "win"
                    ? `+₹${result.payout - betAmount} profit`
                    : result.label === "draw"
                    ? "Bet returned"
                    : `-₹${betAmount} lost`}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={startGame}
                    disabled={effectiveBet > balance}
                    className="flex-1 py-2.5 rounded-xl text-xs font-black transition-all hover:opacity-90 active:scale-95"
                    style={{ background: "linear-gradient(90deg,#d97706,#f59e0b)", color: "#fff" }}
                  >
                    🔄 Play Again
                  </button>
                  <button
                    onClick={resetToLobby}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    ← Change Bet
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="px-4 py-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
                Recent Games
              </p>
            </div>
            <div className="divide-y" style={{ divideColor: "rgba(255,255,255,0.04)" }}>
              {history.slice(0, 5).map((h, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {h.result === "win" ? "🏆" : h.result === "draw" ? "🤝" : "😔"}
                    </span>
                    <div>
                      <p className="text-xs font-bold capitalize" style={{
                        color: h.result === "win" ? "#22c55e" : h.result === "draw" ? "#f59e0b" : "#f87171"
                      }}>
                        {h.result}
                      </p>
                      <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{h.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold" style={{
                      color: h.result === "win" ? "#22c55e" : h.result === "draw" ? "#f59e0b" : "#f87171"
                    }}>
                      {h.result === "win" ? `+₹${h.payout - h.bet}` : h.result === "draw" ? "±₹0" : `-₹${h.bet}`}
                    </p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>Bet ₹{h.bet}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rules card */}
        <div
          className="rounded-2xl p-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>How to Play</p>
          <div className="space-y-1 text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
            <p>✕ You play as <span style={{ color: "#f59e0b" }}>X</span>, AI plays as <span style={{ color: "#06b6d4" }}>O</span></p>
            <p>🏆 Win: Bet × 2 payout</p>
            <p>🤝 Draw: Bet returned</p>
            <p>😔 Loss: Bet lost</p>
            <p>🤖 Hard mode uses perfect AI (unbeatable)</p>
          </div>
        </div>

      </div>
    </div>
  );
}