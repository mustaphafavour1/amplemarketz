"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Play, ChevronDown, Star, Check, X,
  Radio, BookOpen, Mail, TrendingUp,
} from "lucide-react";

/* ── Constants ── */
const NAMES = ["Marc Benioff", "Aaron Ross", "Jill Konrath", "Grant Cardone", "Jason Lemkin", "Trish Bertuzzi"];
const NAV_LINKS = ["Product", "Why us", "Resources", "Customers", "Pricing"];
const TICKER_ITEMS = ["Mistral AI", "Pylon", "Wasabi", "Ceros", "Clara", "Momentum", "Cerebras", "Deel", "Moveworks", "Vanta", "Rippling", "Linear", "Figma", "Notion", "Vercel"];

/* ── Floating card data ── */
const FLOAT_CARDS = {
  A: { type: "job", person: "Sarah Chen", text: "promoted to VP of Sales", time: "just now" },
  B: { rate: "↑ 34%", label: "Reply rate this week" },
  C: { text: "Sequence approved · 47 trained" },
};

/* ── Dashboard preview inner data ── */
const PREVIEW_LEADS = [
  { initials: "SC", name: "Sarah Chen", company: "Notion", signal: "Job Change", color: "#4361EE" },
  { initials: "MW", name: "Marcus Webb", company: "Linear", signal: "Social", color: "#9B59B6" },
  { initials: "PK", name: "Priya Kapoor", company: "Stripe", signal: "Funding", color: "#27AE60" },
];

/* ── Agents section ── */
const AGENTS = [
  { icon: Radio, title: "Signal", body: "Monitors 20+ sources for the exact person ready to buy — before they raise their hand." },
  { icon: BookOpen, title: "Research", body: "Builds deep prospect profiles with context your reps actually need before they hit send." },
  { icon: Mail, title: "Sequence", body: "Writes personalised multichannel outreach in your rep's voice. Gets sharper with every approval." },
];

/* ── Comparison ── */
const COMPARE_ROWS = [
  { feat: "AI voice messages", us: true, them: false },
  { feat: "AI reply handling", us: true, them: false },
  { feat: "Contact-level signals", us: true, them: false },
  { feat: "Feedback learning", us: true, them: false },
  { feat: "Social outreach", us: true, them: false },
  { feat: "Phone pricing", us: "Included", them: "5–8 credits" },
];

/* ── Footer ── */
const FOOTER_COLS = [
  { heading: "Product", items: ["Duo Copilot", "Signal Feed", "Sequences", "Analytics", "Integrations"] },
  { heading: "Company", items: ["About", "Blog", "Careers", "Press", "Security"] },
  { heading: "Legal", items: ["Privacy Policy", "Terms of Service", "GDPR", "Cookie Policy"] },
];

/* ── Dashboard preview with 3D tilt & floating cards ── */
function HeroDashboard() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovering, setHovering] = useState(false);

  const springX = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), { stiffness: 80, damping: 20 });
  const springY = useSpring(useTransform(mouseY, [-200, 200], [6, -6]), { stiffness: 80, damping: 20 });

  const autoRotateX = hovering ? 0 : undefined;
  const autoRotateY = hovering ? 0 : undefined;

  return (
    <div className="relative flex items-center justify-center" style={{ minHeight: 420 }}>
      {/* Glow */}
      <div className="absolute inset-0 rounded-full opacity-50" style={{ background: "radial-gradient(ellipse at center, rgba(232,93,38,0.18) 0%, transparent 65%)", filter: "blur(30px)" }} />

      {/* Float card A — top-left */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -left-4 z-20 bg-white rounded-xl shadow-lg px-3 py-2.5 w-[220px]"
        style={{ border: "1px solid #EEF0F5", boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4361EE] shrink-0" />
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-[#111827] truncate">{FLOAT_CARDS.A.person} {FLOAT_CARDS.A.text}</p>
            <p className="text-[10px] text-[#9CA3AF]">via LinkedIn · {FLOAT_CARDS.A.time}</p>
          </div>
        </div>
      </motion.div>

      {/* Float card B — bottom-right */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute -bottom-4 -right-6 z-20 bg-white rounded-xl shadow-lg px-4 py-3 w-[160px]"
        style={{ border: "1px solid #EEF0F5", boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}
      >
        <p className="text-[24px] font-bold text-[#15803D] leading-none">{FLOAT_CARDS.B.rate}</p>
        <p className="text-[11px] text-[#9CA3AF] mt-0.5">{FLOAT_CARDS.B.label}</p>
      </motion.div>

      {/* Float card C — right mid */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-1/2 -right-8 -translate-y-1/2 z-20 rounded-full px-3.5 py-2 flex items-center gap-2"
        style={{ background: "#1E40AF", boxShadow: "0 4px 16px rgba(30,64,175,0.35)", width: 200 }}
      >
        <span className="text-white text-[11px]">✦</span>
        <p className="text-[11px] font-medium text-white">{FLOAT_CARDS.C.text}</p>
      </motion.div>

      {/* Main dashboard card with auto-tilt */}
      <motion.div
        animate={!hovering ? {
          rotateX: [2, -1, 2],
          rotateY: [-3, 3, -3],
        } : { rotateX: springX.get(), rotateY: springY.get() }}
        transition={!hovering ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
        style={{ rotateX: hovering ? springX : undefined, rotateY: hovering ? springY : undefined, transformPerspective: 1000, border: "1px solid #EEF0F5", boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)" }}
        onMouseMove={e => {
          if (!hovering) return;
          const rect = e.currentTarget.getBoundingClientRect();
          mouseX.set(e.clientX - rect.left - rect.width / 2);
          mouseY.set(e.clientY - rect.top - rect.height / 2);
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => { setHovering(false); mouseX.set(0); mouseY.set(0); }}
        className="relative z-10 w-[420px] bg-white rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#EEF0F5]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#0F1923] rounded flex items-center justify-center">
              <span className="text-white text-[9px] font-bold" style={{ fontFamily: "'Instrument Serif', serif" }}>A</span>
            </div>
            <span className="text-[13px] font-semibold text-[#111827]">Duo Copilot</span>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] text-[#15803D]">
            <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />37 pending
          </span>
        </div>
        <div className="p-3 flex flex-col gap-2 bg-[#F7F6F3]">
          {PREVIEW_LEADS.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center justify-between bg-white rounded-lg px-3 py-2.5 border border-[#EEF0F5]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: `${l.color}18`, color: l.color }}>{l.initials}</div>
                <div>
                  <div className="text-[12px] font-semibold text-[#111827]">{l.name}</div>
                  <div className="text-[10px] text-[#9CA3AF]">{l.company}</div>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${l.color}18`, color: l.color }}>{l.signal}</span>
            </motion.div>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-[#EEF0F5]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[12px] font-semibold text-[#111827]">Sarah Chen</div>
              <div className="text-[10px] text-[#9CA3AF]">VP of Sales · Notion</div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-[#15803D] font-medium">New lead</span>
          </div>
          <div className="text-[11px] text-[#4B5563] italic leading-relaxed bg-[#F7F6F3] rounded-lg px-3 py-2 mb-2.5">
            "Hi Sarah, saw your post about attending SaaStr..."
          </div>
          <div className="flex gap-2">
            <button className="flex-1 h-7 rounded-md text-white text-[11px] font-medium" style={{ background: "#1E40AF" }}>Approve &amp; Send</button>
            <button className="h-7 px-3 rounded-md border border-[#EEF0F5] text-[11px] text-[#4B5563]">Edit</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Comparison table ── */
function ComparisonTable({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-xl overflow-hidden border ${compact ? "text-[12px]" : ""}`} style={{ borderColor: "#EEF0F5" }}>
      <div className="grid grid-cols-[1fr_120px_120px]">
        {/* Header */}
        <div className="px-5 py-3 bg-[#F7F6F3] border-b border-[#EEF0F5]" />
        <div className="px-5 py-3 bg-white border-b border-l border-[#EEF0F5] text-center font-semibold text-[13px] text-[#0F1923]" style={{ borderLeft: "3px solid #0F1923" }}>Amplemarket</div>
        <div className="px-5 py-3 bg-[#F7F6F3] border-b border-l border-[#EEF0F5] text-center font-semibold text-[13px] text-[#9CA3AF]">Others</div>
        {/* Rows */}
        {COMPARE_ROWS.map((row, i) => (
          <>
            <div key={`l${i}`} className="px-5 py-3 border-b border-[#EEF0F5] text-[13px] text-[#4B5563] bg-[#F7F6F3]">{row.feat}</div>
            <div key={`u${i}`} className="px-5 py-3 border-b border-l border-[#EEF0F5] text-center bg-white" style={{ borderLeft: "3px solid #0F1923" }}>
              {row.us === true ? <Check size={14} className="mx-auto text-[#15803D]" /> : <span className="text-[12px] font-medium text-[#0F1923]">{row.us}</span>}
            </div>
            <div key={`t${i}`} className="px-5 py-3 border-b border-l border-[#EEF0F5] text-center bg-[#F7F6F3]">
              {row.them === false ? <X size={14} className="mx-auto text-[#D1D5DB]" /> : <span className="text-[12px] text-[#9CA3AF]">{row.them}</span>}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function LandingPage() {
  const [nameIdx, setNameIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNameIdx(i => (i + 1) % NAMES.length), 2000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#F7F6F3" }}>

      {/* Animated hero background */}
      <div className="fixed inset-0 pointer-events-none hero-gradient" />

      {/* ── NAV ── */}
      <div className="sticky top-4 z-50 flex justify-center px-6">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-5 h-12 px-5 rounded-full"
          style={{
            background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.97)",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "0 1px 8px rgba(0,0,0,0.06)",
            border: "1px solid #EEF0F5",
          }}
        >
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img src="/images/amplemarket-logo.svg" alt="Amplemarket" height={22} style={{ height: 22 }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
            <span className="font-bold text-[14px] text-[#0F1923]" style={{ fontFamily: "'Instrument Serif', serif" }}>amplemarket</span>
          </Link>
          <div className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map(link => (
              <button key={link} className="flex items-center gap-0.5 text-[13px] text-[#4B5563] hover:text-[#111827] transition-colors cursor-pointer">
                {link} {["Product", "Why us", "Resources"].includes(link) && <ChevronDown size={11} className="mt-0.5" />}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="h-8 px-3.5 rounded-full border border-[#E5E7EB] text-[12px] text-[#4B5563] hover:border-[#111827] transition-colors cursor-pointer">Open app</button>
            <Link href="/dashboard">
              <button className="h-8 px-3.5 rounded-full text-[12px] font-medium cursor-pointer text-white hover:opacity-90 transition-opacity" style={{ background: "#0F1923" }}>Get free trial</button>
            </Link>
            <Link href="/dashboard">
              <button className="h-8 px-3.5 rounded-full border text-[12px] font-medium cursor-pointer hover:opacity-80 transition-opacity hidden lg:flex items-center gap-1" style={{ borderColor: "#1E40AF", color: "#1E40AF" }}>
                View Dashboard <ArrowRight size={11} />
              </button>
            </Link>
          </div>
        </motion.nav>
      </div>

      {/* ── HERO ── */}
      <section className="max-w-[1180px] mx-auto px-6 pt-14 pb-20 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 items-center" style={{ minHeight: "calc(100vh - 72px)" }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full border border-[#E5E7EB] bg-white text-[11px] text-[#4B5563] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E85D26]" />YC-Backed
            </span>
            <span className="inline-flex items-center gap-2 h-7 px-3 rounded-full border border-[#E5E7EB] bg-white text-[11px] text-[#4B5563] font-medium">
              {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < 4 ? "#F39C12" : "none"} stroke="#F39C12" />)}
              <strong className="text-[#111827]">Gartner</strong> Generative AI Cool Vendor
            </span>
          </div>

          <h1 className="leading-[1.06] font-normal text-[#0F1923] mb-5"
            style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(42px, 5vw, 66px)" }}>
            What if your team<br />
            sold like{" "}
            <span className="relative inline-block" style={{ minWidth: 300 }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={nameIdx}
                  initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                  animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
                  exit={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-[#E85D26] italic absolute bottom-0 left-0 whitespace-nowrap"
                >
                  {NAMES[nameIdx]}
                </motion.span>
              </AnimatePresence>
              <span className="invisible whitespace-nowrap">{NAMES.reduce((a, b) => a.length >= b.length ? a : b)}</span>
            </span>
            <br />every single day?
          </h1>

          <p className="text-[17px] text-[#4B5563] leading-relaxed max-w-[480px] mb-10">
            Duo learns from the best signals, researches every prospect, and writes outreach that actually gets replies — so your reps can focus on closing.
          </p>

          <div className="flex items-center gap-3 mb-10">
            <Link href="/dashboard">
              <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 h-12 px-6 rounded-lg text-white font-semibold text-[14px] cursor-pointer"
                style={{ background: "#0F1923", boxShadow: "0 4px 16px rgba(15,25,35,0.25)" }}>
                Get free trial <ArrowRight size={16} />
              </motion.button>
            </Link>
            <button className="flex items-center gap-2.5 h-12 px-5 rounded-lg border border-[#E5E7EB] bg-white text-[#111827] font-medium text-[14px] hover:border-[#111827] transition-colors cursor-pointer"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <div className="w-6 h-6 rounded-full bg-[#0F1923] flex items-center justify-center">
                <Play size={8} fill="white" className="ml-0.5" />
              </div>
              See Duo in action
            </button>
          </div>

          <p className="text-[12px] text-[#9CA3AF] mb-3">Trusted by teams that migrated from Apollo, Outreach, ZoomInfo and more.</p>
          <div className="flex flex-wrap items-center gap-5">
            {["Notion", "Stripe", "Linear", "Figma", "Rippling", "Vercel"].map(l => (
              <span key={l} className="text-[13px] font-semibold text-[#C8C5BE]">{l}</span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="relative hidden lg:flex justify-center items-center">
          <img src="/images/rocket.svg" alt="" aria-hidden className="rocket-img absolute -top-14 -right-2 w-[150px] z-30 pointer-events-none"
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
          <HeroDashboard />
        </motion.div>
      </section>

      {/* ── SECTION 2: LOGO TICKER ── */}
      <section className="py-6 border-y" style={{ borderColor: "#E5E7EB" }}>
        <p className="text-center text-[12px] mb-4 font-medium" style={{ color: "#9CA3AF" }}>
          Teams that switched from Apollo, Outreach and ZoomInfo
        </p>
        <div className="overflow-hidden">
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="inline-block px-8 text-[13px] font-semibold" style={{ color: "#C8C5BE" }}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: MEET DUO ── */}
      <section className="max-w-[1180px] mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-[42px] font-normal text-[#0F1923] mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>Meet Duo</h2>
          <p className="text-[17px] text-[#4B5563]">Signal. Research. Sequence. Three agents. One goal.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {AGENTS.map((agent, i) => (
            <motion.div
              key={i}
              whileHover={{ translateY: -4, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
              transition={{ duration: 0.15 }}
              className="bg-white rounded-xl border border-[#EEF0F5] p-6"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#EFF4FF] flex items-center justify-center mb-4">
                <agent.icon size={18} color="#1E40AF" />
              </div>
              <h3 className="text-[20px] font-normal text-[#0F1923] mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>{agent.title}</h3>
              <p className="text-[14px] text-[#4B5563] leading-relaxed">{agent.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: FEATURE HIGHLIGHTS ── */}
      <section className="py-10 border-t border-[#EEF0F5]">
        {/* Row 1 — text left, visual right */}
        <div className="max-w-[1180px] mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[#E85D26] mb-3">Outreach</div>
            <h3 className="text-[36px] font-normal text-[#0F1923] mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Double your meetings<br />with AI outreach</h3>
            <p className="text-[16px] text-[#4B5563] leading-relaxed">Duo writes sequences that sound like your best rep having their best day — every day.</p>
          </div>
          <div className="bg-white rounded-xl border border-[#EEF0F5] overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            {[{ t: "job", p: "Sarah Chen", s: "Promoted to VP of Sales at Notion" }, { t: "social", p: "Marcus Webb", s: "Posted about AI tools" }, { t: "fund", p: "Priya Kapoor", s: "Stripe raised Series H" }].map((row, i) => {
              const C: Record<string, string> = { job: "#4361EE", social: "#9B59B6", fund: "#27AE60" };
              return (
                <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-[#EEF0F5] last:border-0" style={{ borderLeft: `3px solid ${C[row.t]}` }}>
                  <span className="text-[16px]">{{ job: "💼", social: "💬", fund: "💰" }[row.t]}</span>
                  <div>
                    <div className="text-[13px] font-semibold text-[#111827]">{row.p}</div>
                    <div className="text-[12px] text-[#9CA3AF]">{row.s}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2 — visual left, text right */}
        <div className="max-w-[1180px] mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center border-t border-[#EEF0F5]">
          <div className="bg-white rounded-xl border border-[#EEF0F5] p-5" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#EFF4FF] flex items-center justify-center text-[14px] font-bold text-[#1E40AF]">SC</div>
              <div>
                <div className="text-[14px] font-semibold text-[#111827]">Sarah Chen</div>
                <div className="text-[12px] text-[#9CA3AF]">VP of Sales · Notion</div>
              </div>
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-[#15803D] font-medium">New signal</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[["job", "Promoted 3mo ago"], ["social", "Active on LinkedIn"], ["comp", "Checked competitor"], ["fund", "Series B raised"]].map(([t, l]) => {
                const C: Record<string, string> = { job: "#4361EE", social: "#9B59B6", comp: "#E85D26", fund: "#27AE60" };
                return <span key={t} className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${C[t]}18`, color: C[t] }}>{l}</span>;
              })}
            </div>
          </div>
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[#1E40AF] mb-3">Intelligence</div>
            <h3 className="text-[36px] font-normal text-[#0F1923] mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Know who's buying before<br />they raise their hand</h3>
            <p className="text-[16px] text-[#4B5563] leading-relaxed">Contact-level signals from 20+ sources. Not company intent — the actual person moving.</p>
          </div>
        </div>

        {/* Row 3 — text left, comparison right */}
        <div className="max-w-[1180px] mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center border-t border-[#EEF0F5]">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[#E85D26] mb-3">Platform</div>
            <h3 className="text-[36px] font-normal text-[#0F1923] mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>One platform.<br />Zero stitching.</h3>
            <p className="text-[16px] text-[#4B5563] leading-relaxed">Apollo users spend $3,200–$5,000/user/yr across 3–5 tools. Amplemarket includes everything.</p>
          </div>
          <ComparisonTable compact />
        </div>
      </section>

      {/* ── SECTION 5: COMPARISON TABLE (full) ── */}
      <section className="max-w-[860px] mx-auto px-6 py-16 border-t border-[#EEF0F5]">
        <div className="text-center mb-10">
          <h2 className="text-[36px] font-normal text-[#0F1923] mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>Everything, included.</h2>
          <p className="text-[16px] text-[#4B5563]">Compare Amplemarket to the market's most popular tools.</p>
        </div>
        <ComparisonTable />
      </section>

      {/* ── SECTION 6: TESTIMONIAL ── */}
      <section className="py-20 border-t border-[#EEF0F5]">
        <div className="max-w-[760px] mx-auto px-6 text-center">
          <p className="text-[32px] leading-relaxed text-[#0F1923] mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
            &ldquo;Amplemarket is like having a super assistant that doesn&rsquo;t sleep.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EFF4FF] flex items-center justify-center text-[12px] font-bold text-[#1E40AF]">JM</div>
            <div className="text-left">
              <div className="text-[13px] font-semibold text-[#111827]">James Moore</div>
              <div className="text-[12px] text-[#9CA3AF]">VP of Sales, Outreach.io</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: CTA CLOSE ── */}
      <section className="py-20" style={{ background: "#0F1923" }}>
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <h2 className="text-[40px] font-normal text-white mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>Your competitors are already using AI.</h2>
          <p className="text-[17px] text-white/70 mb-8">Get Duo working for your team this week.</p>
          <div className="flex flex-col items-center gap-3">
            <Link href="/dashboard">
              <button className="h-12 px-8 rounded-lg bg-white text-[#0F1923] font-semibold text-[15px] cursor-pointer hover:bg-[#F7F6F3] transition-colors">
                Book a Demo
              </button>
            </Link>
            <p className="text-[12px] text-white/40">No credit card. No 6-month contract.</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0F1923", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1180px] mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm" style={{ fontFamily: "'Instrument Serif', serif" }}>A</span>
              </div>
              <span className="text-white font-bold text-[14px]" style={{ fontFamily: "'Instrument Serif', serif" }}>amplemarket</span>
            </div>
            <p className="text-[13px] text-white/40 leading-relaxed">The AI platform for high-performing sales teams.</p>
          </div>
          {FOOTER_COLS.map(col => (
            <div key={col.heading}>
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-white/30 mb-4">{col.heading}</h4>
              <div className="flex flex-col gap-2.5">
                {col.items.map(item => (
                  <a key={item} href="#" className="text-[13px] text-white/50 hover:text-white/80 transition-colors">{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-[1180px] mx-auto px-6 py-4 border-t border-white/10 flex items-center justify-between">
          <p className="text-[12px] text-white/30">© 2026 Amplemarket · YC-backed</p>
          <div className="flex gap-4">
            {["Twitter", "LinkedIn", "GitHub"].map(s => (
              <a key={s} href="#" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
