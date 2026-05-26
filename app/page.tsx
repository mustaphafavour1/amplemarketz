"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Play, ChevronDown, Star, Check, X,
  Radio, BookOpen, Mail, TrendingUp, Target, Zap, Brain,
} from "lucide-react";

/* ── Constants ── */
const NAMES = ["Marc Benioff", "Aaron Ross", "Jill Konrath", "Grant Cardone", "Jason Lemkin", "Trish Bertuzzi"];
const NAV_LINKS = ["Product", "Why us", "Resources", "Customers", "Pricing"];
const SWITCHER_COMPANIES = ["Mistral AI", "Pylon", "Ceros", "Momentum", "Deel", "Vanta", "Rippling"];

const FOOTER_COLS = [
  { heading: "Product", items: ["Duo Copilot", "Signal Feed", "Sequences", "Analytics", "Integrations"] },
  { heading: "Company", items: ["About", "Blog", "Careers", "Press", "Security"] },
  { heading: "Legal", items: ["Privacy Policy", "Terms of Service", "GDPR", "Cookie Policy"] },
];

const TESTIMONIALS = [
  {
    quote: "Amplemarket is like having a super assistant that doesn't sleep.",
    name: "James Moore", title: "VP of Sales, Outreach.io", initials: "JM",
  },
  {
    quote: "We switched from Apollo and ZoomInfo in one week. Best decision of the year.",
    name: "Sarah Lee", title: "Head of Growth, Figma", initials: "SL",
  },
  {
    quote: "Our reply rate went from 4% to 14% in 30 days. Duo is the real deal.",
    name: "Alex Chen", title: "CEO, Linear", initials: "AC",
  },
];

const FEATURES = [
  "AI voice messages",
  "AI reply handling",
  "Contact-level signals",
  "Feedback learning",
  "Social outreach",
  "Phone pricing included",
  "Email warmup",
  "Unified inbox",
];

const METRICS = [
  { value: "100x", label: "More meetings", sub: "vs cold outreach alone", color: "#E85D26", bg: "rgba(232,93,38,0.06)", rotate: -2 },
  { value: "3x", label: "Faster ramp", sub: "for new AEs", color: "#1E40AF", bg: "rgba(30,64,175,0.06)", rotate: 1.5 },
  { value: "20+", label: "Data sources", sub: "monitored 24/7", color: "#0F1923", bg: "rgba(15,25,35,0.04)", rotate: -1 },
  { value: "<3%", label: "Bounce rate", sub: "with AI deliverability", color: "#15803D", bg: "rgba(21,128,61,0.06)", rotate: 2 },
];

const SIGNAL_DOTS = [
  { label: "Job Change", angle: 60, color: "#4361EE" },
  { label: "Social Post", angle: 120, color: "#9B59B6" },
  { label: "Funding", angle: 180, color: "#27AE60" },
  { label: "Competitor", angle: 270, color: "#E85D26" },
  { label: "Intent Signal", angle: 330, color: "#F39C12" },
];

/* ── Shared fade-up animation ── */
const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.55, ease: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number] },
};

/* ── Display heading style helpers ── */
const D_H1: React.CSSProperties = {
  fontFamily: "var(--font-bricolage)",
  fontWeight: 800,
  fontSize: "clamp(48px, 5.75vw, 76px)",
  lineHeight: 1.06,
};
const D_H2: React.CSSProperties = {
  fontFamily: "var(--font-bricolage)",
  fontWeight: 800,
  fontSize: "clamp(38px, 4vw, 52px)",
  lineHeight: 1.1,
};
const D_H3: React.CSSProperties = {
  fontFamily: "var(--font-bricolage)",
  fontWeight: 800,
  fontSize: "clamp(22px, 2.3vw, 32px)",
  lineHeight: 1.2,
};

/* ── TiltLast: tilt final character of a heading ── */
const TILT_SPAN: React.CSSProperties = {
  display: "inline-block",
  transform: "rotate(8deg)",
  transformOrigin: "bottom center",
};

/* ─────────────────────────────────────────────────────────
   SECTION 1 HERO — Centered logomark with radiating cards
───────────────────────────────────────────────────────── */
function HeroLogoCenter() {
  const [logoError, setLogoError] = useState(false);

  const CARDS = [
    { label: "↑ 34% reply rate", sub: "This week", pos: { top: "6%", left: "0%" } as React.CSSProperties, w: 175 },
    { label: "Sarah Chen promoted", sub: "to VP of Sales", pos: { top: "4%", right: "0%" } as React.CSSProperties, w: 195 },
    { label: "Sequence approved", sub: "47 trained by Duo", pos: { top: "42%", right: "0%" } as React.CSSProperties, w: 190 },
    { label: "12 leads ready", sub: "High intent today", pos: { bottom: "6%", right: "0%" } as React.CSSProperties, w: 178 },
    { label: "Vercel raised $250M", sub: "Funding signal", pos: { bottom: "6%", left: "0%" } as React.CSSProperties, w: 190 },
    { label: "4 meetings today", sub: "Booked by Duo", pos: { top: "42%", left: "0%" } as React.CSSProperties, w: 178 },
  ];

  /* Line endpoints relative to center (250,240) */
  const LINE_ENDS = [
    { x2: 88, y2: 46 },
    { x2: 393, y2: 44 },
    { x2: 397, y2: 218 },
    { x2: 389, y2: 434 },
    { x2: 95, y2: 434 },
    { x2: 89, y2: 218 },
  ];

  return (
    <div className="relative" style={{ width: 500, height: 480 }}>
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(67,97,238,0.08) 0%, transparent 60%)" }} />

      {/* SVG connector lines */}
      <svg className="absolute inset-0" viewBox="0 0 500 480" style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
        {LINE_ENDS.map((end, i) => (
          <motion.line
            key={i}
            x1="250" y1="240"
            x2={end.x2} y2={end.y2}
            stroke="rgba(67,97,238,0.22)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            animate={{ strokeDashoffset: [20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.33 }}
          />
        ))}
      </svg>

      {/* Center logomark */}
      <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
        <motion.div
          animate={{ y: [0, -6, 0], rotateX: [2, -1, 2], rotateY: [-3, 3, -3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            transformPerspective: 800,
            width: 120, height: 120,
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(255,255,255,0.8)",
            borderRadius: 28,
            boxShadow: "0 8px 32px rgba(30,64,175,0.15), 0 2px 8px rgba(0,0,0,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {!logoError ? (
            <img
              src="/images/logomark-black.svg" alt="Amplemarket"
              style={{ width: 64, height: 64 }}
              onError={() => setLogoError(true)}
            />
          ) : (
            <div style={{ width: 64, height: 64, background: "#0F1923", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontWeight: 800, fontSize: 28, fontFamily: "var(--font-bricolage)" }}>A</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Result cards */}
      {CARDS.map((card, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          className="absolute"
          style={{
            ...card.pos,
            width: card.w,
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.7)",
            borderRadius: 12,
            padding: "10px 16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          <p className="text-[12px] font-semibold text-[#111827] leading-snug">{card.label}</p>
          <p className="text-[11px] text-[#9CA3AF] mt-0.5">{card.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION 1 HERO — Centered text + scroll-grow video
───────────────────────────────────────────────────────── */
function HeroSection({ nameIdx }: { nameIdx: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 0.6], [0.76, 1.0]);
  const videoY = useTransform(scrollYProgress, [0, 0.6], [0, -20]);

  return (
    <section ref={sectionRef} className="relative overflow-visible">
      {/* ── Centered text content ── */}
      <div className="max-w-[760px] mx-auto px-6 pt-16 pb-12 text-center">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
          {/* Badges */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full border border-[#D4E4EE] bg-white text-[11px] text-[#4B5563] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E85D26]" />YC-Backed
            </span>
            <span className="inline-flex items-center gap-2 h-7 px-3 rounded-full border border-[#D4E4EE] bg-white text-[11px] text-[#4B5563] font-medium">
              {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < 4 ? "#F39C12" : "none"} stroke="#F39C12" />)}
              <strong className="text-[#111827]">Gartner</strong> Generative AI Cool Vendor
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-[#0F1923] mb-5 text-center" style={D_H1}>
            What if your team<br />
            sold like{" "}
            <span className="relative inline-block" style={{ minWidth: 320 }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={nameIdx}
                  initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                  animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
                  exit={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-[#E85D26] italic absolute bottom-0 left-0 whitespace-nowrap"
                  style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800 }}
                >
                  {NAMES[nameIdx]}
                </motion.span>
              </AnimatePresence>
              <span className="invisible whitespace-nowrap">{NAMES.reduce((a, b) => a.length >= b.length ? a : b)}</span>
            </span>
            <br />every single da<span style={TILT_SPAN}>y</span>?
          </h1>

          {/* Tagline */}
          <p className="text-[17px] text-[#4B5563] leading-relaxed max-w-[520px] mx-auto mb-10">
            Duo learns from the best signals, researches every prospect, and writes outreach that actually gets replies — so your reps can focus on closing.
          </p>

          {/* CTAs */}
          <div className="flex justify-center items-center gap-3 mb-10">
            <Link href="/dashboard">
              <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 h-12 px-6 rounded-lg text-white font-semibold text-[14px] cursor-pointer"
                style={{ background: "#0F1923", boxShadow: "0 4px 16px rgba(15,25,35,0.25)" }}>
                Get free trial <ArrowRight size={16} />
              </motion.button>
            </Link>
            <a href="https://www.amplemarket.com?wvideo=c5bz8hgwty" target="_blank" rel="noopener noreferrer">
              <button className="flex items-center gap-2.5 h-12 px-5 rounded-lg border border-[#D4E4EE] bg-white text-[#111827] font-medium text-[14px] hover:border-[#111827] transition-colors cursor-pointer"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                <div className="w-6 h-6 rounded-full bg-[#0F1923] flex items-center justify-center">
                  <Play size={8} fill="white" className="ml-0.5" />
                </div>
                See Duo in action
              </button>
            </a>
          </div>

          {/* Trust logos */}
          <p className="text-[12px] text-[#9CA3AF] mb-3">Trusted by teams that migrated from Apollo, Outreach, ZoomInfo and more.</p>
          <div className="flex flex-wrap justify-center items-center gap-5">
            {["Notion", "Stripe", "Linear", "Figma", "Rippling", "Vercel"].map(l => (
              <span key={l} className="text-[13px] font-semibold text-[#C8C5BE]">{l}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Scroll-growing video preview ── */}
      <div className="relative max-w-[1100px] mx-auto px-8 pb-28">
        <motion.div
          style={{ scale: videoScale, y: videoY }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="relative"
        >
          {/* HeroLogoCenter floating card — top-left, shrunk */}
          <div
            className="absolute z-20 pointer-events-none"
            style={{
              top: -72,
              left: -40,
              width: 500,
              height: 480,
              transformOrigin: "top left",
              transform: "scale(0.35)",
            }}
          >
            <HeroLogoCenter />
          </div>

          {/* Rocket */}
          <img
            src="/images/rocket.svg"
            alt=""
            aria-hidden
            className="rocket-img absolute z-30 pointer-events-none"
            style={{ width: 90, top: -48, right: 32 }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />

          {/* Wistia video thumbnail */}
          <a
            href="https://www.amplemarket.com?wvideo=c5bz8hgwty"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative rounded-2xl overflow-hidden group"
            style={{
              boxShadow: "0 32px 80px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.08)",
              border: "1px solid rgba(255,255,255,0.7)",
            }}
          >
            <img
              src="https://embed-ssl.wistia.com/deliveries/6230db6bdd2e6c605e2d3b0068bdc4a1.jpg?image_crop_resized=1280x720"
              alt="Amplemarket: AI Sales Copilot for sales teams"
              className="w-full block"
              style={{ aspectRatio: "16/9", objectFit: "cover" }}
            />
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.18)", transition: "background 0.2s" }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center justify-center"
                style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                }}
              >
                <Play size={26} fill="#0F1923" style={{ marginLeft: 4 }} />
              </motion.div>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION 2 — Teams That Switched (animated migration)
───────────────────────────────────────────────────────── */
function SwitcherSection() {
  const [migrated, setMigrated] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setMigrated(0); setPaused(false); }, 3000);
      return () => clearTimeout(t);
    }
    if (migrated >= SWITCHER_COMPANIES.length) {
      setPaused(true);
      return;
    }
    const t = setTimeout(() => setMigrated(m => m + 1), 700);
    return () => clearTimeout(t);
  }, [migrated, paused]);

  return (
    <div className="flex gap-0 rounded-2xl overflow-hidden border border-[#D4E4EE]" style={{ minHeight: 320 }}>
      {/* Left: Before */}
      <div className="flex-1 p-6" style={{ background: "#FFF5F5" }}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2 h-2 rounded-full bg-red-300" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-red-400">Before Amplemarket</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {SWITCHER_COMPANIES.map((co, i) => (
            <AnimatePresence key={co}>
              {i >= migrated && (
                <motion.div
                  initial={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 100, scale: 0.93 }}
                  transition={{ duration: 0.42, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white border"
                  style={{ borderColor: "#FED7D7", filter: "grayscale(0.5)" }}
                >
                  <div className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
                  <span className="text-[12px] font-medium text-gray-400">{co}</span>
                  <span className="ml-auto text-[10px] text-red-400 font-medium">3 tools</span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </div>

      {/* Center: Pulsing arrow */}
      <div className="flex flex-col items-center justify-center w-14 bg-white border-x border-[#D4E4EE] gap-1.5">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <ArrowRight size={20} className="text-[#1E40AF]" />
        </motion.div>
        <span className="text-[9px] text-[#9CA3AF] text-center leading-tight font-medium uppercase tracking-wider">switch</span>
      </div>

      {/* Right: After */}
      <div className="flex-1 p-6" style={{ background: "#F0FDF4" }}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-green-600">After Amplemarket</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {SWITCHER_COMPANIES.map((co, i) => (
            <AnimatePresence key={co}>
              {i < migrated && (
                <motion.div
                  initial={{ opacity: 0, x: -50, scale: 0.93 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.42, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white border"
                  style={{ borderColor: "#BBF7D0" }}
                >
                  <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                  <span className="text-[12px] font-medium text-[#111827]">{co}</span>
                  <div className="ml-auto flex items-center gap-1">
                    <Check size={11} className="text-green-500" />
                    <span className="text-[10px] text-green-600 font-medium">1 platform</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION 3 — Trinity of Sales (triangle arc cards)
───────────────────────────────────────────────────────── */
const TRINITY = [
  { icon: Radio, title: "Signal", body: "Monitors 20+ sources for the exact person ready to buy, before they raise their hand.", color: "#4361EE", bg: "#EEF2FF" },
  { icon: BookOpen, title: "Research", body: "Builds deep prospect profiles with context your reps actually need before they hit send.", color: "#9B59B6", bg: "#F5F0FD" },
  { icon: Mail, title: "Sequence", body: "Writes personalised multichannel outreach in your rep's voice. Gets sharper with every approval.", color: "#27AE60", bg: "#F0FDF4" },
];

function TrinityCard({ item, style }: { item: typeof TRINITY[0]; style: React.CSSProperties }) {
  const Icon = item.icon;
  return (
    <div
      className="absolute flex flex-col items-center text-center p-7 bg-white border border-[#D4E4EE]"
      style={{ width: 210, borderRadius: "100px 100px 20px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", ...style }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: item.bg }}>
        <Icon size={20} color={item.color} />
      </div>
      <h3 className="mb-2 text-[#0F1923]" style={D_H3}>{item.title}</h3>
      <p className="text-[13px] text-[#4B5563] leading-relaxed">{item.body}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION 5 — Mind Reader illustration
───────────────────────────────────────────────────────── */
function MindReaderIllustration() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 360, height: 360 }}>
      {/* Outer gradient ring */}
      <div className="absolute inset-0 rounded-full"
        style={{ background: "linear-gradient(135deg, rgba(30,64,175,0.06) 0%, rgba(67,97,238,0.12) 100%)", border: "1.5px solid rgba(67,97,238,0.15)" }}
      />

      {/* Inner frosted glass circle */}
      <div className="absolute flex items-center justify-center"
        style={{ width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.88)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 8px 32px rgba(30,64,175,0.08)" }}
      >
        {/* Brain wave SVG */}
        <svg viewBox="0 0 200 60" style={{ width: 160, overflow: "visible" }}>
          <motion.path
            d="M0,30 C15,30 15,10 30,10 S45,30 60,30 S75,50 90,50 S105,30 120,30 S135,10 150,10 S165,30 180,30 S195,50 210,50"
            fill="none"
            stroke="#1E40AF"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Signal dots at clock positions */}
      {SIGNAL_DOTS.map((sig, i) => {
        const rad = (sig.angle - 90) * Math.PI / 180;
        const r = 155;
        const cx = 180, cy = 180;
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);
        return (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.35, 1], opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            style={{ position: "absolute", left: x - 20, top: y - 20 }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: `${sig.color}15`,
              border: `1.5px solid ${sig.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: sig.color }} />
            </div>
            <span style={{
              position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
              fontSize: 9, color: sig.color, fontWeight: 600, whiteSpace: "nowrap", marginTop: 3,
            }}>
              {sig.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION 7 — Arc/dome testimonial
───────────────────────────────────────────────────────── */
const TICKER_ROWS = [
  "Reply rate +34% · Meetings +100x · Signals 47 today · Sequences active 23 · Open rate 41%",
  "Bounce <3% · Ramp time 3x faster · Data sources 20+ · Leads researched 142 · AE quota 112%",
];

function TestimonialSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative overflow-hidden py-20" style={{ background: "#F8FAFF" }}>
      {/* Data waterfall ticker background */}
      <div className="absolute inset-0 pointer-events-none flex flex-col gap-6 justify-center overflow-hidden" style={{ opacity: 0.12 }}>
        {[0, 1].map(row => (
          <div key={row} className="overflow-hidden">
            <div className="data-ticker whitespace-nowrap">
              {[...Array(4)].map((_, k) => (
                <span key={k} className="inline-block px-8 text-[11px] text-[#1E40AF] font-medium"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {TICKER_ROWS[row % 2]}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="relative max-w-[720px] mx-auto px-6">
        {/* Arc/dome card */}
        <div style={{
          background: "#FFFFFF",
          borderRadius: "200px 200px 20px 20px",
          boxShadow: "0 16px 64px rgba(0,0,0,0.08)",
          padding: "56px 64px 48px",
          border: "1px solid #D4E4EE",
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-[28px] leading-[1.4] text-[#0F1923] mb-8"
                style={{ fontFamily: "'Instrument Serif', serif" }}>
                &ldquo;{TESTIMONIALS[idx].quote}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EFF4FF] flex items-center justify-center text-[13px] font-bold text-[#1E40AF]">
                  {TESTIMONIALS[idx].initials}
                </div>
                <div className="text-left">
                  <div className="text-[13px] font-semibold text-[#111827]">{TESTIMONIALS[idx].name}</div>
                  <div className="text-[12px] text-[#9CA3AF]">{TESTIMONIALS[idx].title}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className="rounded-full transition-all cursor-pointer"
                style={{
                  width: idx === i ? 20 : 6, height: 6,
                  background: idx === i ? "#1E40AF" : "#D4E4EE",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────── */
export default function LandingPage() {
  const [nameIdx, setNameIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [navLogoError, setNavLogoError] = useState(false);
  const [footerLogoError, setFooterLogoError] = useState(false);

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
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#F8FAFF" }}>
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
            border: "1px solid #D4E4EE",
          }}
        >
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {!navLogoError ? (
              <img src="/images/wordmark-black.svg" alt="Amplemarket" height={22} style={{ height: 22, display: "block" }}
                onError={() => setNavLogoError(true)} />
            ) : (
              <span className="font-bold text-[14px] text-[#0F1923]" style={{ fontFamily: "var(--font-bricolage)" }}>amplemarket</span>
            )}
          </Link>
          <div className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map(link => (
              <button key={link} className="flex items-center gap-0.5 text-[13px] text-[#4B5563] hover:text-[#111827] transition-colors cursor-pointer">
                {link} {["Product", "Why us", "Resources"].includes(link) && <ChevronDown size={11} className="mt-0.5" />}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="h-8 px-3.5 rounded-full border border-[#D4E4EE] text-[12px] text-[#4B5563] hover:border-[#111827] transition-colors cursor-pointer">Open app</button>
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

      {/* ── SECTION 1: HERO ── */}
      <HeroSection nameIdx={nameIdx} />

      {/* ── SECTION 2: TEAMS THAT SWITCHED ── */}
      <motion.section className="max-w-[860px] mx-auto px-6 py-16" {...fadeUp}>
        <div className="text-center mb-10">
          <h2 className="text-[#0F1923] mb-3" style={D_H2}>
            Teams That Switche<span style={TILT_SPAN}>d</span>
          </h2>
          <p className="text-[17px] text-[#4B5563]">From Apollo, Outreach and ZoomInfo, to one platform that does it all.</p>
        </div>
        <SwitcherSection />
      </motion.section>

      {/* ── SECTION 3: TRINITY OF SALES ── */}
      <motion.section className="py-20 border-t border-[#D4E4EE]" {...fadeUp}>
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#0F1923] mb-3" style={D_H2}>
              The Trinity of Sale<span style={TILT_SPAN}>s</span>
            </h2>
            <p className="text-[17px] text-[#4B5563]">Signal. Research. Sequence. Three agents working in concert.</p>
          </div>

          {/* Triangle layout */}
          <div className="relative max-w-[800px] mx-auto" style={{ height: 520 }}>
            {/* Radial glow */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(67,97,238,0.05) 0%, transparent 70%)" }} />

            {/* SVG arcs between cards */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 520" preserveAspectRatio="none" style={{ pointerEvents: "none" }}>
              <motion.path d="M 400,200 C 300,260 180,300 165,400"
                fill="none" stroke="rgba(67,97,238,0.22)" strokeWidth="2" strokeDasharray="8 5"
                animate={{ strokeDashoffset: [26, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.path d="M 220,400 C 380,450 500,450 620,400"
                fill="none" stroke="rgba(155,89,182,0.22)" strokeWidth="2" strokeDasharray="8 5"
                animate={{ strokeDashoffset: [26, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.8 }}
              />
              <motion.path d="M 638,385 C 620,275 510,210 440,200"
                fill="none" stroke="rgba(39,174,96,0.22)" strokeWidth="2" strokeDasharray="8 5"
                animate={{ strokeDashoffset: [26, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.6 }}
              />
            </svg>

            {/* Signal – top center */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <TrinityCard item={TRINITY[0]} style={{ top: 0, left: "50%", transform: "translateX(-50%)" }} />
            </motion.div>

            {/* Research – bottom left */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <TrinityCard item={TRINITY[1]} style={{ top: 285, left: 0 }} />
            </motion.div>

            {/* Sequence – bottom right */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
              <TrinityCard item={TRINITY[2]} style={{ top: 285, right: 0 }} />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 4: 100X MORE MEETINGS ── */}
      <motion.section className="py-20 border-t border-[#D4E4EE]" {...fadeUp}>
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-[#0F1923] mb-3" style={D_H2}>
              100x more meetings. 99.9x more deals closed<span style={TILT_SPAN}>.</span>
            </h2>
            <p className="text-[17px] text-[#4B5563]">Numbers your board will ask about. Results your team will celebrate.</p>
          </div>

          <div
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {METRICS.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-2xl border border-[#D4E4EE] p-8 shrink-0"
                style={{
                  width: 240,
                  scrollSnapAlign: "start",
                  rotate: m.rotate,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                  background: m.bg,
                  borderColor: `${m.color}20`,
                }}
              >
                <div className="text-[56px] font-black leading-none mb-2" style={{ color: m.color, fontFamily: "var(--font-bricolage)" }}>{m.value}</div>
                <div className="text-[16px] font-bold text-[#0F1923] mb-1" style={{ fontFamily: "var(--font-bricolage)" }}>{m.label}</div>
                <div className="text-[13px] text-[#9CA3AF]">{m.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 5: CLOSE DEALS LIKE A MIND READER ── */}
      <motion.section className="py-20 border-t border-[#D4E4EE]" {...fadeUp}>
        <div className="max-w-[1180px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: text + benefits */}
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-wider text-[#E85D26] mb-3">Intelligence</div>
            <h2 className="text-[#0F1923] mb-5" style={D_H2}>
              Close Deals Like a Mind Reade<span style={TILT_SPAN}>r</span>
            </h2>
            <p className="text-[16px] text-[#4B5563] leading-relaxed mb-8">
              Contact-level signals from 20+ sources. Not company intent, the actual person moving.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: Zap, label: "Job change signals", desc: "Know the moment a champion gets promoted or changes company." },
                { icon: Target, label: "Intent signals", desc: "Catch prospects researching solutions like yours, in real time." },
                { icon: TrendingUp, label: "Funding alerts", desc: "Strike when budgets expand after a funding round closes." },
              ].map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#EFF4FF" }}>
                      <Icon size={15} color="#1E40AF" />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-[#111827] mb-0.5">{b.label}</div>
                      <div className="text-[13px] text-[#4B5563] leading-relaxed">{b.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: glass circle illustration */}
          <div className="flex justify-center">
            <MindReaderIllustration />
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 6: EVERYTHING YOU NEED; NOW YOURS ── */}
      <motion.section className="py-20 border-t border-[#D4E4EE]" {...fadeUp}>
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[#0F1923] mb-3" style={D_H2}>
              Everything You Need. Now Your<span style={TILT_SPAN}>s</span>.
            </h2>
            <p className="text-[17px] text-[#4B5563]">Apollo users spend $3,200 to $5,000 per user across 3 to 5 tools. Amplemarket includes everything.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[860px] mx-auto">
            {/* Left: Amplemarket */}
            <div className="rounded-2xl p-6 border"
              style={{ background: "linear-gradient(135deg, rgba(30,64,175,0.05), rgba(67,97,238,0.02))", borderColor: "rgba(147,197,253,0.35)", boxShadow: "0 4px 20px rgba(30,64,175,0.06)" }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded bg-[#0F1923] flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold" style={{ fontFamily: "var(--font-bricolage)" }}>A</span>
                </div>
                <span className="text-[14px] font-bold text-[#0F1923]" style={{ fontFamily: "var(--font-bricolage)" }}>Amplemarket</span>
              </div>
              <div className="flex flex-col gap-3">
                {FEATURES.map((feat, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-[12px] text-[#374151] flex-1">{feat}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ width: 80, background: "rgba(147,197,253,0.2)" }}>
                        <div className="h-full rounded-full" style={{ width: "100%", background: "#1E40AF" }} />
                      </div>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "#F0FDF4", color: "#15803D" }}>Included</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Others */}
            <div className="rounded-2xl p-6 border border-[#D4E4EE] bg-white"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-[14px] font-bold text-[#9CA3AF]" style={{ fontFamily: "var(--font-bricolage)" }}>Others</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-500 font-semibold">3+ tools required</span>
              </div>
              <div className="flex flex-col gap-3">
                {FEATURES.map((feat, i) => {
                  const segs = [30, 50, 20];
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[12px] text-[#9CA3AF] flex-1">{feat}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="h-1.5 rounded-full overflow-hidden flex gap-px" style={{ width: 80 }}>
                          {segs.map((w, si) => (
                            <div key={si} className="h-full" style={{ width: `${w}%`, background: ["#D4E4EE", "#C9D9EA", "#BDD0E6"][si] }} />
                          ))}
                        </div>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "#FFF7ED", color: "#EA580C" }}>3 tools</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 7: TESTIMONIAL ── */}
      <motion.section {...fadeUp}>
        <TestimonialSection />
      </motion.section>

      {/* ── CTA CLOSE ── */}
      <motion.section className="py-20" style={{ background: "#0F1923" }} {...fadeUp}>
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <h2 className="text-[40px] font-black text-white mb-3" style={{ fontFamily: "var(--font-bricolage)" }}>
            Your competitors are already using AI<span style={{ display: "inline-block", transform: "rotate(8deg)", transformOrigin: "bottom center" }}>.</span>
          </h2>
          <p className="text-[17px] text-white/70 mb-8">Get Duo working for your team this week.</p>
          <div className="flex flex-col items-center gap-3">
            <Link href="/dashboard">
              <button className="h-12 px-8 rounded-lg bg-white text-[#0F1923] font-semibold text-[15px] cursor-pointer hover:bg-[#F8FAFF] transition-colors">
                Book a Demo
              </button>
            </Link>
            <p className="text-[12px] text-white/40">No credit card. No 6-month contract.</p>
          </div>
        </div>
      </motion.section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0F1923", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1180px] mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              {!footerLogoError ? (
                <img src="/images/wordmark-white.svg" alt="Amplemarket" height={22}
                  style={{ height: 22, display: "block" }}
                  onError={() => setFooterLogoError(true)} />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-bricolage)" }}>A</span>
                  </div>
                  <span className="text-white font-bold text-[14px]" style={{ fontFamily: "var(--font-bricolage)" }}>amplemarket</span>
                </div>
              )}
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
