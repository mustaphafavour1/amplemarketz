"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, Play, ChevronDown, Star, Check, X,
  Radio, BookOpen, Mail, TrendingUp, Target, Zap, Brain, Send,
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

const LEFT_METRICS = [
  { value: "100x", label: "More meetings", sub: "vs cold outreach alone", color: "#E85D26" },
  { value: "3x", label: "Faster ramp", sub: "for new AEs", color: "#60A5FA" },
];

const RIGHT_METRICS = [
  { value: "20+", label: "Data sources", sub: "monitored 24/7", color: "#A78BFA" },
  { value: "<3%", label: "Bounce rate", sub: "with AI deliverability", color: "#34D399" },
];

const SWITCHER_ITEMS = [
  { name: "Mistral AI",  badBadge: "costlier tools",     goodBadge: "10x more deals" },
  { name: "Pylon",       badBadge: "3 separate tools",   goodBadge: "1 platform" },
  { name: "Ceros",       badBadge: "manual research",    goodBadge: "AI research" },
  { name: "Momentum",    badBadge: "low reply rates",    goodBadge: "14.9% reply rate" },
  { name: "Deel",        badBadge: "missed signals",     goodBadge: "real-time signals" },
  { name: "Vanta",       badBadge: "less calls booked",  goodBadge: "4x more calls" },
  { name: "Rippling",    badBadge: "tool sprawl",        goodBadge: "fully automated" },
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
  fontSize: "clamp(38px, 4.5vw, 58px)",
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
      <div className="max-w-[760px] mx-auto px-6 pt-24 pb-12 text-center">
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
            <span className="relative inline-block" style={{ minWidth: 320, overflow: "visible", paddingRight: 16 }}>
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
            {/* Play button — no overlay on image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center justify-center"
                style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
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
      const t = setTimeout(() => { setMigrated(0); setPaused(false); }, 2500);
      return () => clearTimeout(t);
    }
    if (migrated >= SWITCHER_ITEMS.length) { setPaused(true); return; }
    const t = setTimeout(() => setMigrated(m => m + 1), 650);
    return () => clearTimeout(t);
  }, [migrated, paused]);

  const remaining = SWITCHER_ITEMS.filter((_, i) => i >= migrated);
  const arrived  = SWITCHER_ITEMS.filter((_, i) => i < migrated);

  return (
    <div className="flex items-start gap-6" style={{ height: 420, perspective: 1200 }}>
      {/* LEFT panel — "Before" — lower */}
      <motion.div
        className="flex-1 rounded-2xl border p-5 flex flex-col"
        style={{
          height: 380, marginTop: 40,
          background: "rgba(255,245,245,0.85)",
          border: "1px solid #FED7D7",
          boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
          transformStyle: "preserve-3d",
          transform: "rotateY(6deg) rotateX(2deg)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-red-300" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-red-400">Before Amplemarket</span>
        </div>
        <div className="flex flex-col gap-2 flex-1 overflow-hidden">
          <AnimatePresence>
            {remaining.map((item) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 120, scale: 0.9, rotateY: 15 }}
                transition={{ duration: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border"
                style={{ borderColor: "#FED7D7" }}
              >
                <div className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />
                <span className="text-[12px] font-medium text-gray-400 flex-1">{item.name}</span>
                <span className="text-[9px] text-red-400 font-medium px-1.5 py-0.5 rounded-full" style={{ background: "rgba(254,202,202,0.3)" }}>{item.badBadge}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {remaining.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} className="text-[12px] text-red-300 italic">All switched ✓</motion.p>
            </div>
          )}
        </div>
      </motion.div>

      {/* CENTER arrow — right-upward flowing */}
      <div className="flex flex-col items-center justify-center shrink-0 mt-16" style={{ width: 64 }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <motion.path
            d="M8 36 L36 8 M24 8 L36 8 L36 20"
            stroke="#1E40AF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="60"
            animate={{ strokeDashoffset: [60, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
        <span className="text-[9px] text-[#9CA3AF] uppercase tracking-wider font-semibold mt-1">switch</span>
      </div>

      {/* RIGHT panel — "After" — higher */}
      <motion.div
        className="flex-1 rounded-2xl border p-5 flex flex-col"
        style={{
          height: 380, marginTop: 0,
          background: "rgba(240,253,244,0.9)",
          border: "1px solid #BBF7D0",
          boxShadow: "0 16px 48px rgba(21,128,61,0.08)",
          transformStyle: "preserve-3d",
          transform: "rotateY(-6deg) rotateX(2deg)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-green-600">After Amplemarket</span>
        </div>
        <div className="flex flex-col gap-2 flex-1 overflow-hidden">
          <AnimatePresence>
            {arrived.map((item) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, x: -80, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border"
                style={{ borderColor: "#BBF7D0" }}
              >
                <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                <span className="text-[12px] font-medium text-[#111827] flex-1">{item.name}</span>
                <div className="flex items-center gap-1">
                  <Check size={10} className="text-green-500" />
                  <span className="text-[9px] text-green-600 font-medium px-1.5 py-0.5 rounded-full" style={{ background: "rgba(187,247,208,0.4)" }}>{item.goodBadge}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {arrived.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} className="text-[12px] text-green-400 italic">Ready to receive →</motion.p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION 3 — Trinity of Sales (Venn diagram)
───────────────────────────────────────────────────────── */
function TrinityVenn() {
  return (
    <div className="relative max-w-[700px] mx-auto" style={{ height: 580 }}>
      {/* SVG — circles shifted up to avoid bottom clipping */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 580" style={{ pointerEvents: "none" }}>
        <defs>
          <radialGradient id="cg1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#4361EE" stopOpacity="0.18"/><stop offset="100%" stopColor="#4361EE" stopOpacity="0.04"/></radialGradient>
          <radialGradient id="cg2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#9B59B6" stopOpacity="0.18"/><stop offset="100%" stopColor="#9B59B6" stopOpacity="0.04"/></radialGradient>
          <radialGradient id="cg3" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#27AE60" stopOpacity="0.18"/><stop offset="100%" stopColor="#27AE60" stopOpacity="0.04"/></radialGradient>
        </defs>
        {/* Signal — top center */}
        <circle cx="350" cy="200" r="165" fill="url(#cg1)" stroke="#4361EE" strokeWidth="1.2" strokeOpacity="0.35"/>
        {/* Research — bottom-left */}
        <circle cx="235" cy="360" r="165" fill="url(#cg2)" stroke="#9B59B6" strokeWidth="1.2" strokeOpacity="0.35"/>
        {/* Sequence — bottom-right */}
        <circle cx="465" cy="360" r="165" fill="url(#cg3)" stroke="#27AE60" strokeWidth="1.2" strokeOpacity="0.35"/>
      </svg>

      {/* Signal label — inside top circle */}
      <div className="absolute text-center" style={{ left: "50%", top: "4%", transform: "translateX(-50%)", width: 150 }}>
        <div className="text-[14px] font-bold mb-1.5" style={{ color: "#4361EE" }}>Signal</div>
        <div className="text-[11px] leading-snug" style={{ color: "#4B5563" }}>Duo monitors 20+ sources and finds the exact person ready to buy.</div>
      </div>

      {/* Research label — inside bottom-left circle */}
      <div className="absolute text-center" style={{ left: "3%", top: "60%", width: 148 }}>
        <div className="text-[14px] font-bold mb-1.5" style={{ color: "#9B59B6" }}>Research</div>
        <div className="text-[11px] leading-snug" style={{ color: "#4B5563" }}>Duo builds deep prospect profiles your reps need before they hit send.</div>
      </div>

      {/* Sequence label — inside bottom-right circle */}
      <div className="absolute text-center" style={{ right: "3%", top: "60%", width: 148 }}>
        <div className="text-[14px] font-bold mb-1.5" style={{ color: "#27AE60" }}>Sequence</div>
        <div className="text-[11px] leading-snug" style={{ color: "#4B5563" }}>Duo writes personalised multichannel outreach in your rep&apos;s voice.</div>
      </div>

      {/* Center "Sales" label at the triple-overlap */}
      <div className="absolute flex items-center justify-center" style={{ left: "50%", top: "52%", transform: "translate(-50%,-50%)" }}>
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-center"
          style={{
            background: "rgba(255,255,255,0.94)",
            backdropFilter: "blur(12px)",
            borderRadius: 16,
            padding: "10px 18px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.8)",
          }}
        >
          <div className="text-[20px] font-black text-[#0F1923]" style={{ fontFamily: "var(--font-bricolage)" }}>Sales</div>
          <div className="text-[9px] text-[#9CA3AF] uppercase tracking-wider">where it all meets</div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION 5 — Mind Reader illustration
───────────────────────────────────────────────────────── */
function MindReaderIllustration() {
  const [logoError, setLogoError] = useState(false);
  const POINTS = [
    { label: "Job Change", angle: 45, color: "#4361EE", desc: "Promoted to VP" },
    { label: "Funding Alert", angle: 135, color: "#27AE60", desc: "$250M raised" },
    { label: "Intent Signal", angle: 225, color: "#E85D26", desc: "Researching now" },
    { label: "Competitor Visit", angle: 315, color: "#9B59B6", desc: "Checked your page" },
  ];
  const R = 170;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 420, height: 420 }}>
      {/* Very blurred soft glow from center */}
      <div className="absolute" style={{ width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(67,97,238,0.18) 0%, transparent 70%)", filter: "blur(32px)", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />

      {/* SVG flowing lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 420" style={{ pointerEvents: "none" }}>
        {POINTS.map((pt, i) => {
          const rad = (pt.angle - 90) * Math.PI / 180;
          const x2 = 210 + R * Math.cos(rad);
          const y2 = 210 + R * Math.sin(rad);
          return (
            <motion.line
              key={i}
              x1="210" y1="210" x2={x2} y2={y2}
              stroke={pt.color}
              strokeWidth="1.5"
              strokeOpacity="0.4"
              strokeDasharray="8 5"
              animate={{ strokeDashoffset: [26, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
            />
          );
        })}
      </svg>

      {/* 3D center logo */}
      <motion.div
        animate={{ y: [0, -6, 0], rotateX: [2, -1, 2], rotateY: [-3, 3, -3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          transformPerspective: 800,
          width: 100, height: 100,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(12px)",
          border: "1.5px solid rgba(255,255,255,0.8)",
          borderRadius: 24,
          boxShadow: "0 8px 32px rgba(30,64,175,0.18), 0 2px 8px rgba(0,0,0,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10, position: "relative",
        }}
      >
        {!logoError ? (
          <img src="/images/logomark-black.svg" alt="Amplemarket" style={{ width: 52, height: 52 }} onError={() => setLogoError(true)} />
        ) : (
          <span style={{ color: "#0F1923", fontWeight: 800, fontSize: 28, fontFamily: "var(--font-bricolage)" }}>A</span>
        )}
      </motion.div>

      {/* Signal dots */}
      {POINTS.map((pt, i) => {
        const rad = (pt.angle - 90) * Math.PI / 180;
        const x = 210 + R * Math.cos(rad) - 40;
        const y = 210 + R * Math.sin(rad) - 28;
        return (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
            style={{ position: "absolute", left: x, top: y }}
          >
            <div style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              border: `1px solid ${pt.color}40`,
              borderRadius: 10,
              padding: "6px 10px",
              boxShadow: `0 4px 12px ${pt.color}20`,
              minWidth: 80,
            }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: pt.color }}>{pt.label}</div>
              <div style={{ fontSize: 8, color: "#6B7280", marginTop: 1 }}>{pt.desc}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION 7 — Testimonial
───────────────────────────────────────────────────────── */
const TICKER_SETS = [
  ["Reply rate +34%", "Meetings +100x", "Signals 47 today", "Sequences active 23"],
  ["Bounce <3%", "Ramp time 3x faster", "Data sources 20+", "Leads researched 142"],
  ["AE quota 112%", "Open rate 41%", "Deals closed 8 this week", "Calls booked 4x"],
];

function TestimonialSection() {
  const [idx, setIdx] = useState(0);
  const [tickerSet, setTickerSet] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTickerSet(s => (s + 1) % TICKER_SETS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative overflow-hidden py-24" style={{ background: "#F8FAFF" }}>
      {/* BG text — large, tight line-height, 3% opacity, full-width, slow fade between sets */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.032 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tickerSet}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            className="flex flex-col"
            style={{ lineHeight: 0.88 }}
          >
            {TICKER_SETS[tickerSet].map((phrase, i) => (
              <div
                key={i}
                className="font-black text-[#0F1923] whitespace-nowrap w-full"
                style={{ fontFamily: "var(--font-bricolage)", fontSize: "clamp(80px, 10vw, 128px)", lineHeight: 0.9 }}
              >
                {phrase}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative max-w-[900px] mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.1, 0.64, 1] }}
            className="flex items-start gap-10"
          >
            {/* Avatar clipped in quote/apostrophe shape */}
            <div className="shrink-0">
              <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                  <clipPath id="quoteClip" clipPathUnits="objectBoundingBox">
                    <path d="M0.5,0 C0.78,0 1,0.15 1,0.38 L1,0.72 C1,0.9 0.82,1 0.62,1 L0.42,1 C0.22,1 0.1,0.9 0.1,0.78 L0.1,0.65 C0.1,0.55 0.18,0.48 0.28,0.48 L0.5,0.48 C0.62,0.48 0.72,0.4 0.72,0.3 L0.72,0.12 C0.72,0.05 0.62,0 0.5,0 Z" />
                  </clipPath>
                </defs>
              </svg>
              <div style={{
                width: 120, height: 140,
                clipPath: "url(#quoteClip)",
                overflow: "hidden",
              }}>
                <img
                  src={`https://i.pravatar.cc/140?img=${idx + 10}`}
                  alt={TESTIMONIALS[idx].name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Testimony */}
            <div className="flex-1">
              <p className="text-[27px] leading-[1.42] text-[#0F1923] mb-6"
                style={{ fontFamily: "'Instrument Serif', serif" }}>
                &ldquo;{TESTIMONIALS[idx].quote}&rdquo;
              </p>
              <div style={{ height: 1, background: "linear-gradient(90deg, #D4E4EE, transparent)", marginBottom: 16 }} />
              <div className="flex items-center gap-2">
                <div className="text-[13px] font-semibold text-[#111827]">{TESTIMONIALS[idx].name}</div>
                <span className="text-[#D4E4EE]">·</span>
                <div className="text-[12px] text-[#9CA3AF]">{TESTIMONIALS[idx].title}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="flex items-center gap-2 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className="rounded-full transition-all cursor-pointer"
              style={{ width: idx === i ? 24 : 6, height: 6, background: idx === i ? "#1E40AF" : "#D4E4EE" }} />
          ))}
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
      {/* Animated blob background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <div className="relative" style={{ zIndex: 1 }}>

        {/* ── NAV ── */}
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-6">
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

        {/* Spacer for fixed nav */}
        <div className="pt-20" />

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
                Enjoy the Trinity of Sale<span style={TILT_SPAN}>s</span>
              </h2>
              <p className="text-[17px] text-[#4B5563]">Signal. Research. Sequence. Three agents working in concert.</p>
            </div>

            <TrinityVenn />
          </div>
        </motion.section>

        {/* ── SECTION 4: METRICS — dark two-panel ── */}
        <section className="noise-bg py-24 relative overflow-hidden" style={{ zIndex: 0 }}>
          <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* LEFT panel — 100x more meetings at TOP */}
            <motion.div
              {...fadeUp}
              className="rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", minHeight: 360 }}
            >
              {/* Heading at top */}
              <div>
                <div className="text-[80px] font-black leading-none mb-0" style={{ color: "#E85D26", fontFamily: "var(--font-bricolage)" }}>100x</div>
                <div className="text-[22px] font-bold text-white mb-6" style={{ fontFamily: "var(--font-bricolage)" }}>more meetings</div>
              </div>
              {/* Two cards bottom */}
              <div className="grid grid-cols-2 gap-3 mt-auto">
                {LEFT_METRICS.map((m, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="rounded-2xl p-4"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <div className="text-[34px] font-black leading-none mb-1" style={{ color: m.color, fontFamily: "var(--font-bricolage)" }}>{m.value}</div>
                    <div className="text-[12px] font-semibold text-white/80 mb-0.5">{m.label}</div>
                    <div className="text-[10px] text-white/40">{m.sub}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT panel — 99.9x more deals at BOTTOM */}
            <motion.div
              {...fadeUp}
              className="rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", minHeight: 360 }}
            >
              {/* Two cards top */}
              <div className="grid grid-cols-2 gap-3 mb-auto">
                {RIGHT_METRICS.map((m, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="rounded-2xl p-4"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <div className="text-[34px] font-black leading-none mb-1" style={{ color: m.color, fontFamily: "var(--font-bricolage)" }}>{m.value}</div>
                    <div className="text-[12px] font-semibold text-white/80 mb-0.5">{m.label}</div>
                    <div className="text-[10px] text-white/40">{m.sub}</div>
                  </motion.div>
                ))}
              </div>
              {/* Heading at bottom */}
              <div className="mt-6">
                <div className="text-[80px] font-black leading-none mb-0" style={{ color: "#60A5FA", fontFamily: "var(--font-bricolage)" }}>99.9x</div>
                <div className="text-[22px] font-bold text-white" style={{ fontFamily: "var(--font-bricolage)" }}>more deals closed</div>
              </div>
            </motion.div>

          </div>
        </section>

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

            {/* Right: mind reader illustration */}
            <div className="flex justify-center">
              <MindReaderIllustration />
            </div>
          </div>
        </motion.section>

        {/* ── SECTION 6: EVERYTHING YOU NEED ── */}
        <motion.section className="py-20 border-t border-[#D4E4EE]" {...fadeUp}>
          <div className="max-w-[860px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-[#0F1923] mb-1" style={D_H2}>
                Everything You Need<span style={TILT_SPAN}>.</span>
              </h2>
              <h2 className="text-[#0F1923] mb-4" style={D_H2}>
                Now Yours 💯
              </h2>
              <p className="text-[17px] text-[#4B5563] max-w-[560px] mx-auto">
                Other tools charge you $3,000–$5,000 per user across 3–5 platforms. With Amplemarket, that same cost closes <strong>20x more deals.</strong>
              </p>
            </div>

            {/* Single Amplemarket card with send-icon features */}
            <div className="rounded-2xl p-8 border relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(30,64,175,0.05), rgba(67,97,238,0.02))", borderColor: "rgba(147,197,253,0.35)", boxShadow: "0 4px 20px rgba(30,64,175,0.06)" }}>

              {/* Large send icon top-right */}
              <div className="absolute top-6 right-6 opacity-[0.07]">
                <Send size={80} color="#1E40AF" />
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Send size={18} color="#1E40AF" />
                <span className="text-[15px] font-bold text-[#0F1923]" style={{ fontFamily: "var(--font-bricolage)" }}>Amplemarket</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold ml-auto" style={{ background: "#F0FDF4", color: "#15803D" }}>Everything included</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {FEATURES.map((feat, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2.5"
                  >
                    <motion.div
                      animate={{ x: [0, 2, 0], y: [0, -1, 0] }}
                      transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    >
                      <Send size={11} color="#1E40AF" style={{ opacity: 0.7 }} />
                    </motion.div>
                    <span className="text-[13px] text-[#374151]">{feat}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── SECTION 7: TESTIMONIAL ── */}
        <motion.section {...fadeUp}>
          <TestimonialSection />
        </motion.section>

        {/* ── CTA CLOSE ── */}
        <motion.section className="py-20 noise-bg relative overflow-hidden" {...fadeUp}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(30,64,175,0.15) 0%, transparent 70%)" }} />
          <div className="relative max-w-[640px] mx-auto px-6 text-center">
            <h2 className="text-[40px] font-black text-white mb-3" style={{ fontFamily: "var(--font-bricolage)" }}>
              Your competitors are already using AI<span style={{ display: "inline-block", transform: "rotate(8deg)", transformOrigin: "bottom center" }}>.</span>
            </h2>
            <p className="text-[17px] text-white/70 mb-10">Get Duo working for your team this week.</p>

            {/* Email form */}
            <div className="flex items-center gap-0 rounded-2xl overflow-hidden mb-4 max-w-[480px] mx-auto"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
              <input
                type="email"
                placeholder="Enter your company email"
                className="flex-1 outline-none bg-transparent px-5 py-3.5 text-white placeholder-white/40 text-[14px]"
              />
              <button className="h-full px-5 py-3.5 font-semibold text-[14px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                style={{ background: "white", color: "#0F1923", borderRadius: "0 16px 16px 0" }}>
                Get free trial
              </button>
            </div>

            {/* Social proof badge */}
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#F39C12" stroke="none" />)}
              </div>
              <span className="text-white/40 text-[12px]">|</span>
              <span className="text-white/50 text-[12px]">Generative AI Cool Vendor by Gartner</span>
            </div>
            <p className="text-[12px] text-white/30 mt-3">No credit card. No 6-month contract.</p>
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
    </div>
  );
}
