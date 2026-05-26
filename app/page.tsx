"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, ChevronDown, Star } from "lucide-react";
import { RocketFigure } from "@/components/landing/SketchIllustration";
import { DashboardPreview } from "@/components/landing/DashboardPreview";

const NAMES = ["Marc Benioff", "Aaron Ross", "Jill Konrath", "Grant Cardone", "Jason Lemkin", "Trish Bertuzzi"];
const LOGOS = ["Notion", "Stripe", "Linear", "Figma", "Rippling", "Vercel"];
const NAV_LINKS = ["Product", "Why us", "Resources", "Customers", "Pricing"];

export default function LandingPage() {
  const [nameIdx, setNameIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNameIdx(i => (i + 1) % NAMES.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F6F3] overflow-x-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, rgba(232,93,38,0.15) 0%, transparent 65%)" }} />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(67,97,238,0.08) 0%, transparent 65%)" }} />
      </div>

      {/* Floating pill nav */}
      <div className="sticky top-4 z-50 flex justify-center px-6">
        <motion.nav
          className={`flex items-center gap-6 h-12 px-5 rounded-full border border-[#E4E2DC] transition-all ${scrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-white/95 shadow-md"}`}
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#0F1923] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{ fontFamily: "'Instrument Serif', serif" }}>A</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map(link => (
              <button key={link} className="flex items-center gap-0.5 text-[13px] text-[#5C5C5C] hover:text-[#111111] transition-colors cursor-pointer">
                {link} {["Product", "Why us", "Resources"].includes(link) && <ChevronDown size={11} className="mt-0.5" />}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-2">
            <button className="h-8 px-3.5 rounded-full border border-[#E4E2DC] text-[12px] text-[#5C5C5C] hover:border-[#111111] transition-colors cursor-pointer">
              Open app
            </button>
            <Link href="/dashboard">
              <button className="h-8 px-3.5 rounded-full bg-[#0F1923] text-white text-[12px] font-medium hover:bg-[#1a2d3d] transition-colors cursor-pointer">
                Get free trial
              </button>
            </Link>
          </div>
        </motion.nav>
      </div>

      {/* Hero section */}
      <section className="max-w-[1180px] mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 items-center" style={{ minHeight: "calc(100vh - 80px)" }}>

        {/* Left zone */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
          {/* Eyebrow */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="inline-flex items-center gap-2 h-7 px-3 rounded-full border border-[#E4E2DC] bg-white text-[11px] text-[#5C5C5C] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E85D26]" />
              YC-Backed
            </span>
            <span className="inline-flex items-center gap-2 h-7 px-3 rounded-full border border-[#E4E2DC] bg-white text-[11px] text-[#5C5C5C] font-medium">
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill={i < 4 ? "#F39C12" : "none"} stroke="#F39C12" />
                ))}
              </span>
              Generative AI Cool Vendor by <strong className="text-[#111111]">Gartner</strong>
            </span>
          </div>

          {/* H1 with rotating name */}
          <h1 className="leading-[1.06] font-normal text-[#0F1923] mb-6 text-[52px] md:text-[64px]"
            style={{ fontFamily: "'Instrument Serif', serif" }}>
            What if your team<br />
            sold like{" "}
            <span className="relative inline-block" style={{ minWidth: "280px" }}>
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
            <br />
            every single day?
          </h1>

          <p className="text-[17px] text-[#5C5C5C] leading-relaxed max-w-[480px] mb-10">
            Duo learns from the best signals, researches every prospect, and writes outreach that actually gets replies — so your reps can focus on closing.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 mb-10">
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 h-12 px-6 rounded-lg bg-[#0F1923] text-white font-semibold text-[14px] cursor-pointer"
                style={{ boxShadow: "0 4px 16px rgba(15,25,35,0.25)" }}
              >
                Get free trial <ArrowRight size={16} />
              </motion.button>
            </Link>
            <button className="flex items-center gap-2.5 h-12 px-5 rounded-lg border border-[#E4E2DC] bg-white text-[#111111] font-medium text-[14px] hover:border-[#111111] transition-colors cursor-pointer"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <div className="w-6 h-6 rounded-full bg-[#0F1923] flex items-center justify-center">
                <Play size={9} fill="white" className="ml-0.5" />
              </div>
              See Duo in action
            </button>
          </div>

          {/* Social proof */}
          <div>
            <p className="text-[12px] text-[#9A9A9A] mb-3">
              Trusted by teams that migrated from Apollo, Outreach, ZoomInfo and more.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              {LOGOS.map(logo => (
                <span key={logo} className="text-[13px] font-semibold text-[#BEBAB2]">{logo}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right zone */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative hidden lg:flex justify-center items-center"
        >
          <RocketFigure className="absolute -top-16 -right-4 w-[150px] opacity-75 z-10" />
          <DashboardPreview />
        </motion.div>
      </section>

      {/* Announcement banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex justify-center pb-8"
      >
        <Link href="/dashboard">
          <span className="inline-flex items-center gap-2 h-8 px-4 rounded-full bg-[#0F1923] text-white text-[12px] font-medium cursor-pointer hover:bg-[#1e3248] transition-colors">
            <span className="bg-white text-[#0F1923] text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">NEW</span>
            Automate next steps with Workflows →
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
