import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, BarChart3, ShieldCheck, FileBarChart } from "lucide-react";

const COLORS = {
  brandBlue: "#0C70F2",
  navyDeep: "#011F4A",
  navyMid: "#022C6B",
  ink: "#141826",
  border: "#C6D4E8",
  pageBg: "#EFF8FC",
  textSecondary: "#5A6B8C",
};

function LlamaMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M38 8 L46 30 L40 34 L34 12 Z" fill="#033473" />
      <path d="M52 6 L60 32 L52 36 L46 14 Z" fill="#0C70F2" />
      <path d="M34 30 L64 30 L70 46 L64 70 L58 92 L46 92 L42 66 L28 46 Z" fill="#0C70F2" />
      <path d="M58 46 L70 46 L64 70 L58 92 L50 92 L54 66 Z" fill="#033473" />
    </svg>
  );
}

function MountainsMobile() {
  return (
    <svg
      viewBox="0 0 390 130"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 w-full h-[110px]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="0,130 0,70 70,95 140,55 210,90 270,45 330,85 390,60 390,130" fill="#022C6B" opacity="0.9" />
      <polygon points="0,130 0,95 90,115 160,80 240,110 310,75 390,105 390,130" fill="#0A449E" opacity="0.5" />
      <g transform="translate(240,44)">
        <polygon points="10,0 14,12 6,12" fill="#010E29" />
        <polygon points="5,0 9,11 2,11" fill="#010E29" />
        <path d="M1 11 L19 11 L21 21 L19 37 L15 54 L11 54 L10 38 L4 24 Z" fill="#010E29" />
      </g>
    </svg>
  );
}

const trustChips = [
  { icon: BarChart3, label: "Visibilidade total" },
  { icon: ShieldCheck, label: "Mais segurança" },
  { icon: FileBarChart, label: "Decisões por dados" },
];

export default function LoginPageMobile() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="min-h-screen w-full flex justify-center" style={{ background: "#0B1220" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@800&display=swap');`}</style>

      <div
        className="w-full max-w-[430px] min-h-screen flex flex-col relative"
        style={{ background: COLORS.pageBg, fontFamily: "Inter, system-ui, sans-serif" }}
      >
        {/* Top brand banner */}
        <div
          className="relative shrink-0 h-[300px] overflow-hidden px-6 pt-12"
          style={{ background: `linear-gradient(160deg, ${COLORS.navyDeep} 0%, ${COLORS.navyMid} 100%)` }}
        >
          <div className="flex items-center gap-2 relative z-10">
            <LlamaMark size={26} />
            <span
              className="text-white text-lg"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              LhamaLog
            </span>
          </div>

          <h1 className="text-white font-extrabold text-[1.35rem] leading-snug mt-6 max-w-[260px] relative z-10">
            Logs que impulsionam decisões.
          </h1>

          <MountainsMobile />
        </div>

        {/* Form card, overlapping the banner */}
        <div
          className="relative z-10 -mt-7 flex-1 bg-white rounded-t-[28px] px-6 pt-8 pb-6 flex flex-col"
          style={{ boxShadow: "0 -12px 30px -18px rgba(3,52,115,0.25)" }}
        >
          <h2 className="text-2xl font-bold" style={{ color: COLORS.ink }}>
            Entrar
          </h2>
          <p className="mt-1.5 mb-6 text-sm" style={{ color: COLORS.textSecondary }}>
            Acesse sua conta para ver ocorrências e relatórios.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: COLORS.ink }}>
                E-mail
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2" color="#7C8DB5" />
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full rounded-lg border pl-11 pr-4 py-3.5 text-sm outline-none transition-colors focus:border-[#0C70F2]"
                  style={{ borderColor: COLORS.border, color: COLORS.ink }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: COLORS.ink }}>
                Senha
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2" color="#7C8DB5" />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="w-full rounded-lg border pl-11 pr-11 py-3.5 text-sm outline-none transition-colors focus:border-[#0C70F2]"
                  style={{ borderColor: COLORS.border, color: COLORS.ink }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={18} color="#7C8DB5" /> : <Eye size={18} color="#7C8DB5" />}
                </button>
              </div>
            </div>

            {/* Stacks on very narrow screens, sits side by side once there's room */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-3 text-sm">
              <label className="flex items-center gap-2 cursor-pointer select-none" style={{ color: COLORS.ink }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#0C70F2]"
                />
                Lembrar de mim
              </label>
              <a href="#" className="font-medium hover:underline" style={{ color: COLORS.brandBlue }}>
                Esqueci minha senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg py-3.5 text-white font-medium transition-opacity hover:opacity-90"
              style={{ background: COLORS.brandBlue, minHeight: 52 }}
            >
              Entrar
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Compact trust chips, horizontally scrollable */}
          <div className="flex gap-2 overflow-x-auto mt-6 pb-1 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
            {trustChips.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 rounded-full px-3 py-2 shrink-0 whitespace-nowrap"
                style={{ background: "#F1F6FE" }}
              >
                <Icon size={14} color={COLORS.brandBlue} />
                <span className="text-xs font-medium" style={{ color: COLORS.ink }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-center mt-auto pt-6" style={{ color: "#9AA6C3" }}>
            Ao continuar, você concorda com nossos{" "}
            <a href="#" className="underline" style={{ color: COLORS.brandBlue }}>
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="#" className="underline" style={{ color: COLORS.brandBlue }}>
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
