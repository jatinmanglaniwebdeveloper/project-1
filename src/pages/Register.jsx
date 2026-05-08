import { useState } from "react";
import { Link } from "react-router-dom";

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+977", flag: "🇳🇵", name: "Nepal" },
];

const API_BASE = "https://l7mq43xw-8080.inc1.devtunnels.ms";

const inputStyle = {
  background: "rgba(255,255,255,0.07)",
  border: "1.5px solid rgba(255,255,255,0.12)",
  color: "#f1f5f9",
  caretColor: "#f59e0b",
};
const inputFocus = (e) => {
  e.target.style.border = "1.5px solid #f59e0b";
  e.target.style.background = "rgba(245,158,11,0.07)";
  e.target.style.outline = "none";
};
const inputBlur = (e) => {
  e.target.style.border = "1.5px solid rgba(255,255,255,0.12)";
  e.target.style.background = "rgba(255,255,255,0.07)";
};

export default function Register({ onNavigate }) {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [countryCode, setCountryCode] = useState("+91");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    setError("");
  };

  const validate = () => {
    const errors = {};
    if (!form.fullName.trim()) errors.fullName = "Full name is required";
    if (!form.username.trim()) errors.username = "Username is required";
    else if (form.username.length < 3) errors.username = "Minimum 3 characters required";
    if (!form.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\d{7,15}$/.test(form.phone)) errors.phone = "Enter valid phone number";
    if (!form.password) errors.password = "Password is required";
    else if (form.password.length < 8) errors.password = "Minimum 8 characters required";
    if (!form.confirmPassword) errors.confirmPassword = "Please confirm password";
    else if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  const handleRegister = async () => {
    setError("");
    setSuccess("");
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setLoading(true);
    try {
      const payload = {
        fullName: form.fullName.trim(),
        username: form.username.trim(),
        phone: `${countryCode}${form.phone.trim()}`,
        password: form.password,
      };
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || data?.error || `Registration failed (${res.status})`);
      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => onNavigate?.("login"), 1500);
    } catch (err) {
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError("Unable to connect to server.");
      } else {
        setError(err.message || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Logo */}
    <Link to="/" className="mb-6 md:mb-8 select-none text-center">
        <h1
          className="text-4xl md:text-5xl font-black tracking-widest"
          style={{
            fontFamily: "'Georgia', serif",
            color: "#f59e0b",
            textShadow: "0 0 30px rgba(245,158,11,0.4), 2px 2px 0 #92400e",
            letterSpacing: "6px",
          }}
        >
          DREAMGAME<span style={{ color: "#ffffff" }}>7</span>
        </h1>
        <p
          className="text-center text-xs tracking-widest mt-1 font-semibold"
          style={{ color: "rgba(245,158,11,0.5)" }}
        >
          PLAY · WIN · REPEAT
        </p>
      </Link>

      {/* Card */}
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Card Header */}
        <div
          className="px-6 md:px-8 py-4 text-center"
          style={{ background: "linear-gradient(90deg, #d97706, #f59e0b)" }}
        >
          <h2 className="text-base md:text-lg font-black text-white tracking-widest uppercase">
            📝 Register
          </h2>
          <p className="text-amber-100 text-xs mt-0.5">Create your DreamGame7 account</p>
        </div>

        {/* Form */}
        <div className="px-5 md:px-7 py-5 md:py-6 space-y-4">
          {error && (
            <div
              className="text-sm rounded-xl px-4 py-3 flex items-center gap-2 font-medium"
              style={{
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.35)",
                color: "#fca5a5",
              }}
            >
              <span>⚠️</span> {error}
            </div>
          )}
          {success && (
            <div
              className="text-sm rounded-xl px-4 py-3 flex items-center gap-2 font-medium"
              style={{
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.35)",
                color: "#6ee7b7",
              }}
            >
              <span>✅</span> {success}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold mb-1.5 tracking-wider uppercase" style={{ color: "#f59e0b" }}>
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange("fullName")}
                onFocus={inputFocus}
                onBlur={inputBlur}
                autoComplete="off"
                spellCheck="false"
                autoCorrect="off"
                autoCapitalize="words"
                className="w-full rounded-xl px-4 py-3 pr-11 text-sm font-medium"
                style={inputStyle}
              />
              <span className="absolute right-3.5 top-3 text-lg select-none pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }}>
                👤
              </span>
            </div>
            {fieldErrors.fullName && <p className="text-xs mt-1 pl-1" style={{ color: "#fca5a5" }}>{fieldErrors.fullName}</p>}
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-bold mb-1.5 tracking-wider uppercase" style={{ color: "#f59e0b" }}>
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Choose a username"
                value={form.username}
                onChange={handleChange("username")}
                onFocus={inputFocus}
                onBlur={inputBlur}
                autoComplete="off"
                spellCheck="false"
                autoCorrect="off"
                autoCapitalize="off"
                className="w-full rounded-xl px-4 py-3 pr-11 text-sm font-medium"
                style={inputStyle}
              />
              <span className="absolute right-3.5 top-3 text-lg select-none pointer-events-none" style={{ color: "rgba(255,255,255,0.3)" }}>
                🪪
              </span>
            </div>
            {fieldErrors.username && <p className="text-xs mt-1 pl-1" style={{ color: "#fca5a5" }}>{fieldErrors.username}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-bold mb-1.5 tracking-wider uppercase" style={{ color: "#f59e0b" }}>
              Phone Number
            </label>
            <div
              className="flex rounded-xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.12)" }}
            >
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="px-2 md:px-3 text-xs md:text-sm bg-transparent text-white outline-none flex-shrink-0"
                style={{ borderRight: "1px solid rgba(255,255,255,0.08)" }}
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code} style={{ color: "#000" }}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange("phone")}
                onFocus={inputFocus}
                onBlur={inputBlur}
                className="flex-1 px-3 md:px-4 py-3 text-sm font-medium bg-transparent min-w-0"
                style={{ color: "#f1f5f9", caretColor: "#f59e0b", outline: "none" }}
              />
              <span className="flex items-center pr-3 md:pr-4 text-lg select-none pointer-events-none flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>
                📞
              </span>
            </div>
            {fieldErrors.phone && <p className="text-xs mt-1 pl-1" style={{ color: "#fca5a5" }}>{fieldErrors.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold mb-1.5 tracking-wider uppercase" style={{ color: "#f59e0b" }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                value={form.password}
                onChange={handleChange("password")}
                onFocus={inputFocus}
                onBlur={inputBlur}
                autoComplete="new-password"
                className="w-full rounded-xl px-4 py-3 pr-11 text-sm font-medium"
                style={inputStyle}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-2.5 text-xl transition-colors select-none"
                style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none" }}
              >
                {showPassword ? "👁️" : "🔒"}
              </button>
            </div>
            {fieldErrors.password && <p className="text-xs mt-1 pl-1" style={{ color: "#fca5a5" }}>{fieldErrors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold mb-1.5 tracking-wider uppercase" style={{ color: "#f59e0b" }}>
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                onFocus={inputFocus}
                onBlur={inputBlur}
                autoComplete="new-password"
                className="w-full rounded-xl px-4 py-3 pr-11 text-sm font-medium"
                style={inputStyle}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3.5 top-2.5 text-xl transition-colors select-none"
                style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none" }}
              >
                {showConfirm ? "👁️" : "🔒"}
              </button>
            </div>
            {fieldErrors.confirmPassword && <p className="text-xs mt-1 pl-1" style={{ color: "#fca5a5" }}>{fieldErrors.confirmPassword}</p>}
          </div>

          {/* Register Button */}
          <button
            type="button"
            disabled={loading}
            onClick={handleRegister}
            className="w-full py-3 md:py-3.5 rounded-xl text-white font-black text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
            style={{
              background: "linear-gradient(90deg, #d97706 0%, #f59e0b 100%)",
              boxShadow: "0 4px 20px rgba(245,158,11,0.35)",
            }}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" />
                </svg>
                Creating...
              </>
            ) : (
              "Register →"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>OR</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* WhatsApp */}
          <button
            type="button"
            onClick={() => window.open("https://wa.me/919999999999?text=I want to register on DreamGame7", "_blank")}
            className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(90deg, #128C7E, #25D366)" }}
          >
            <span className="text-lg">💬</span> Get ID via WhatsApp
          </button>

          {/* Login link */}
          <p className="text-center text-xs pt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            Already have an account?{" "}
            <Link to="/auth/login" className="font-bold underline transition-colors" style={{ color: "#f59e0b" }}>
              Login here
            </Link>
          </p>

          <p className="text-center text-[10px] leading-relaxed" style={{ color: "rgba(255,255,255,0.2)" }}>
            Protected by reCAPTCHA ·{" "}
            <span className="underline cursor-pointer">Privacy Policy</span> &amp;{" "}
            <span className="underline cursor-pointer">Terms of Service</span>
          </p>
        </div>
      </div>

      <p className="mt-5 text-xs font-medium" style={{ color: "rgba(245,158,11,0.4)" }}>
        🔒 SSL Encrypted · 100% Secure · 18+ Only
      </p>
    </div>
  );
}