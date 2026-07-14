"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Sparkles, 
  X, 
  ArrowUpRight,
  ZoomIn,
  Smartphone,
  Globe
} from "lucide-react";

export default function UiUxProjects() {
  const [activeModal, setActiveModal] = useState<"lumin" | "jvo" | null>(null);

  // Keyboard navigation & Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="uiux" className="relative z-20 min-h-screen bg-transparent px-6 py-28 md:py-36 border-t border-white/5">
      <div className="mx-auto max-w-7xl text-white">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>INTERACTIVE SHOWCASE</span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            UI/UX <span className="font-light italic text-gray-300">Design Cases</span>
          </h2>
        </motion.div>

        {/* ========================================================================= */}
        {/* CASE 1: LUMIN MIND — MOBILE APP CASE STUDY CARD                           */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="group relative rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 md:p-10 shadow-2xl mb-16 transition-all duration-300 hover:border-purple-500/30"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div>
                <span className="inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-purple-300">
                  MENTAL HEALTH & AI DIAGNOSTICS UX CASE STUDY
                </span>
              </div>

              <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl leading-tight">
                Lumin Mind — Mental Health & Wellness App
              </h3>

              <p className="text-sm leading-relaxed text-gray-400 md:text-base">
                Lumin Mind leverages computer vision facial scanning, vocal sentiment analysis, and interactive wellness tools to provide friction-free diagnostic tracking and stress de-escalation.
              </p>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                  • FIGMA
                </span>
                <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
                  • UI/UX DESIGN
                </span>
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                  • AI DIAGNOSTICS
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  • MOBILE APP DESIGN
                </span>
                <span className="rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-300">
                  • USER RESEARCH
                </span>
              </div>

              {/* View Case Study Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setActiveModal("lumin")}
                  className="inline-flex items-center gap-2 rounded-full bg-purple-500 px-7 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-105 hover:bg-purple-600 hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] cursor-pointer"
                >
                  <span>VIEW CASE STUDY</span>
                  <ArrowUpRight className="h-4 w-4 stroke-[3]" />
                </button>
              </div>
            </div>

            {/* Right Card Media Preview (Interactive Phone Preview) */}
            <div 
              onClick={() => setActiveModal("lumin")}
              className="lg:col-span-7 relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-6 shadow-2xl group/img cursor-pointer flex items-center justify-center min-h-[360px]"
            >
              <div className="flex gap-4 sm:gap-6 items-center justify-center transition-transform duration-500 group-hover/img:scale-103">
                <div className="w-[160px] sm:w-[200px] rounded-[1.8rem] border-[6px] border-neutral-900 bg-neutral-950 aspect-[9/19.5] relative overflow-hidden shadow-2xl">
                  <Image
                    src="/uiux/lumin-mind/Home Dashboard.png"
                    alt="Lumin Mind Dashboard"
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
                <div className="w-[160px] sm:w-[200px] rounded-[1.8rem] border-[6px] border-neutral-900 bg-neutral-950 aspect-[9/19.5] relative overflow-hidden shadow-2xl -translate-y-4">
                  <Image
                    src="/uiux/lumin-mind/Facial Scan Screen.png"
                    alt="Lumin Mind AI Diagnostics"
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Hover Cue */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover/img:opacity-100 backdrop-blur-[2px]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 shadow-xl transition-transform duration-300 group-hover/img:scale-110">
                  <ZoomIn className="h-6 w-6" />
                </div>
                <span className="mt-3 text-xs font-bold uppercase tracking-widest text-purple-200 bg-black/70 px-3.5 py-1.5 rounded-full border border-white/10">
                  Explore Full Case Study
                </span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CASE 2: JVO LABS — CORPORATE WEB PLATFORM CASE STUDY CARD                 */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="group relative rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 md:p-10 shadow-2xl transition-all duration-300 hover:border-emerald-500/30"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div>
                <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-emerald-300">
                  CORPORATE DIGITAL & SERVICES WEB CASE STUDY
                </span>
              </div>

              <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl leading-tight">
                JVO Labs — Enterprise Web & Digital Platform
              </h3>

              <p className="text-sm leading-relaxed text-gray-400 md:text-base">
                A complete web platform redesign and corporate digital system crafted for JVO Labs, translating complex software consulting services into clean, conversion-focused user interfaces.
              </p>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                  • FIGMA
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  • WEB DESIGN
                </span>
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                  • BRAND SYSTEM
                </span>
                <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
                  • WIREFRAMING
                </span>
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                  • INFORMATION ARCHITECTURE
                </span>
              </div>

              {/* View Case Study Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setActiveModal("jvo")}
                  className="inline-flex items-center gap-2 rounded-full bg-[#10b981] px-7 py-3.5 text-sm font-extrabold uppercase tracking-wide text-black shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-105 hover:bg-[#059669] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] cursor-pointer"
                >
                  <span>VIEW CASE STUDY</span>
                  <ArrowUpRight className="h-4 w-4 stroke-[3]" />
                </button>
              </div>
            </div>

            {/* Right Card Media Preview (Browser Mockup Preview) */}
            <div 
              onClick={() => setActiveModal("jvo")}
              className="lg:col-span-7 relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] shadow-2xl group/img cursor-pointer flex flex-col"
            >
              {/* Browser Bar */}
              <div className="flex items-center gap-1.5 bg-neutral-900 px-4 py-3 border-b border-white/5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                <div className="ml-3 flex-1 max-w-[280px] h-4 rounded bg-white/5 text-[10px] text-gray-500 flex items-center px-2 font-mono">
                  jvolabs.com/case-study
                </div>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={`/uiux/jvo-labs/${encodeURIComponent("Homepage with Industries Section - JVO Labs.png")}`}
                  alt="JVO Labs Web UI Preview"
                  fill
                  quality={85}
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-103"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover/img:opacity-100 backdrop-blur-[2px]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-xl transition-transform duration-300 group-hover/img:scale-110">
                    <ZoomIn className="h-6 w-6" />
                  </div>
                  <span className="mt-3 text-xs font-bold uppercase tracking-widest text-emerald-300 bg-black/70 px-3.5 py-1.5 rounded-full border border-white/10">
                    Explore Full Case Study
                  </span>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

      </div>

      {/* ========================================================================= */}
      {/* CASE 1 MODAL: LUMIN MIND DETAILED CASE STUDY                              */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeModal === "lumin" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-[#080808]/98 overflow-y-auto backdrop-blur-2xl p-4 md:p-12"
          >
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="fixed top-6 right-6 z-[350] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white transition-all hover:bg-white/20 hover:scale-110 cursor-pointer shadow-2xl"
              aria-label="Close Case Study"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mx-auto max-w-6xl space-y-16 py-8">
              
              {/* HERO COVER BANNER */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-purple-950/40 via-neutral-950 to-black p-8 md:p-14 min-h-[380px] md:min-h-[460px] flex flex-col justify-end">
                <span className="inline-block rounded-full border border-purple-500/40 bg-purple-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-purple-300 self-start mb-4">
                  MENTAL HEALTH & AI DIAGNOSTICS UX CASE STUDY
                </span>
                <h1 className="text-3xl font-extrabold text-white md:text-6xl tracking-tight leading-tight">
                  Lumin Mind — Mental Health & Wellness App
                </h1>
              </div>

              {/* PROJECT BRIEF & OVERVIEW + SKILLS & TOOLS */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-8 space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                    Project Brief & Overview
                  </h3>
                  <p className="text-base leading-relaxed text-gray-300 md:text-lg">
                    Lumin Mind leverages computer vision facial scanning, vocal sentiment analysis, and interactive wellness tools to provide friction-free diagnostic tracking and stress de-escalation for modern users.
                  </p>
                </div>

                <div className="md:col-span-4 rounded-2xl border border-white/10 bg-[#111111] p-6 space-y-3 shadow-xl">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 font-mono">
                    SKILLS & TOOLS
                  </h4>
                  <ul className="space-y-2 text-sm font-semibold text-emerald-400">
                    <li>Figma</li>
                    <li>UI/UX Design</li>
                    <li>AI Stress Diagnostics</li>
                    <li>Mobile App Architecture</li>
                    <li>User Research & Prototyping</li>
                  </ul>
                </div>
              </div>

              {/* SECTION 1: ONBOARDING & DIAGNOSTICS FLOW */}
              <div className="space-y-6 pt-6">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                    ONBOARDING & DIAGNOSTICS FLOW
                  </span>
                  <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    Onboarding & Diagnostics Flow
                  </h3>
                  <p className="text-sm text-gray-400 md:text-base leading-relaxed">
                    Conversational greeting, friction-free OTP authentication, and computer vision diagnostics.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/40 p-6 md:p-10 overflow-hidden shadow-2xl grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {["Tell Us About Yourself.png", "Facial Scan Screen.png", "Voice Input Screen.png"].map((screen) => (
                    <div key={screen} className="flex flex-col items-center">
                      <div className="w-full max-w-[240px] aspect-[9/19.5] relative rounded-[2rem] border-[6px] border-neutral-900 bg-neutral-950 overflow-hidden shadow-xl">
                        <Image
                          src={`/uiux/lumin-mind/${encodeURIComponent(screen)}`}
                          alt={screen}
                          fill
                          sizes="240px"
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-3 text-center text-xs font-semibold text-gray-300">
                        {screen.replace('.png', '')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: CORE DASHBOARDS & WELLNESS */}
              <div className="space-y-6 pt-10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                    CORE DASHBOARDS & FEATURES
                  </span>
                  <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    Core Dashboards & Features
                  </h3>
                  <p className="text-sm text-gray-400 md:text-base leading-relaxed">
                    The central product cockpit aggregating daily stress indexes, recommendations, and biological reports.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/40 p-6 md:p-10 overflow-hidden shadow-2xl grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {["Home Dashboard.png", "Wellness Recommendations.png", "Stress Result Screen.png"].map((screen) => (
                    <div key={screen} className="flex flex-col items-center">
                      <div className="w-full max-w-[240px] aspect-[9/19.5] relative rounded-[2rem] border-[6px] border-neutral-900 bg-neutral-950 overflow-hidden shadow-xl">
                        <Image
                          src={`/uiux/lumin-mind/${encodeURIComponent(screen)}`}
                          alt={screen}
                          fill
                          sizes="240px"
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-3 text-center text-xs font-semibold text-gray-300">
                        {screen.replace('.png', '')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: UTILITIES & GAMIFIED HABITS */}
              <div className="space-y-6 pt-10 pb-12">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                    UTILITIES & GAMIFIED HABITS
                  </span>
                  <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    Utilities & Gamified Habits
                  </h3>
                  <p className="text-sm text-gray-400 md:text-base leading-relaxed">
                    Encrypted biometric journaling, habit streaks, and reward milestone pathways.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/40 p-6 md:p-10 overflow-hidden shadow-2xl grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {["Emotion Locker.png", "Gamification & Rewards.png", "Profile & Wellness Trends.png"].map((screen) => (
                    <div key={screen} className="flex flex-col items-center">
                      <div className="w-full max-w-[240px] aspect-[9/19.5] relative rounded-[2rem] border-[6px] border-neutral-900 bg-neutral-950 overflow-hidden shadow-xl">
                        <Image
                          src={`/uiux/lumin-mind/${encodeURIComponent(screen)}`}
                          alt={screen}
                          fill
                          sizes="240px"
                          className="object-cover"
                        />
                      </div>
                      <p className="mt-3 text-center text-xs font-semibold text-gray-300">
                        {screen.replace('.png', '')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* CASE 2 MODAL: JVO LABS DETAILED CASE STUDY                                */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeModal === "jvo" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-[#080808]/98 overflow-y-auto backdrop-blur-2xl p-4 md:p-12"
          >
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="fixed top-6 right-6 z-[350] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white transition-all hover:bg-white/20 hover:scale-110 cursor-pointer shadow-2xl"
              aria-label="Close Case Study"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mx-auto max-w-6xl space-y-16 py-8">
              
              {/* HERO COVER BANNER */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-emerald-950/40 via-neutral-950 to-black p-8 md:p-14 min-h-[380px] md:min-h-[460px] flex flex-col justify-end">
                <span className="inline-block rounded-full border border-emerald-500/40 bg-emerald-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300 self-start mb-4">
                  CORPORATE DIGITAL & SERVICES WEB CASE STUDY
                </span>
                <h1 className="text-3xl font-extrabold text-white md:text-6xl tracking-tight leading-tight">
                  JVO Labs — Enterprise Web & Digital Platform
                </h1>
              </div>

              {/* PROJECT BRIEF & OVERVIEW + SKILLS & TOOLS */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-8 space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                    Project Brief & Overview
                  </h3>
                  <p className="text-base leading-relaxed text-gray-300 md:text-lg">
                    A complete web platform redesign and corporate digital system crafted for JVO Labs, translating complex software consulting services into clean, conversion-focused user interfaces.
                  </p>
                </div>

                <div className="md:col-span-4 rounded-2xl border border-white/10 bg-[#111111] p-6 space-y-3 shadow-xl">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 font-mono">
                    SKILLS & TOOLS
                  </h4>
                  <ul className="space-y-2 text-sm font-semibold text-emerald-400">
                    <li>Figma</li>
                    <li>Web Design</li>
                    <li>Brand Architecture</li>
                    <li>Wireframing</li>
                    <li>Information Architecture</li>
                  </ul>
                </div>
              </div>

              {/* SECTION 1: LANDING & BRANDING INTERFACES */}
              <div className="space-y-6 pt-6">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                    LANDING & BRANDING INTERFACES
                  </span>
                  <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    Landing & Corporate Identity
                  </h3>
                  <p className="text-sm text-gray-400 md:text-base leading-relaxed">
                    Impactful hero positioning, industrial vertical classification, and core value proposition.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/40 p-6 md:p-10 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
                  {["Homepage with Industries Section - JVO Labs.png", "About Us - JVO Labs.png"].map((screen) => (
                    <div key={screen} className="flex flex-col items-center">
                      <div className="w-full rounded-2xl border border-white/10 bg-[#121212] overflow-hidden shadow-xl flex flex-col">
                        <div className="flex items-center gap-1.5 bg-neutral-900 px-3 py-2 border-b border-white/5">
                          <div className="h-2 w-2 rounded-full bg-red-500/60" />
                          <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
                          <div className="h-2 w-2 rounded-full bg-green-500/60" />
                        </div>
                        <div className="relative aspect-[16/10] w-full">
                          <Image
                            src={`/uiux/jvo-labs/${encodeURIComponent(screen)}`}
                            alt={screen}
                            fill
                            sizes="600px"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                      <p className="mt-3 text-center text-xs font-semibold text-gray-300">
                        {screen.replace(' - JVO Labs.png', '').replace('.png', '')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: SERVICES & CASE STUDIES */}
              <div className="space-y-6 pt-10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                    SERVICES & CASE STUDIES
                  </span>
                  <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    Services & Case Studies
                  </h3>
                  <p className="text-sm text-gray-400 md:text-base leading-relaxed">
                    Modular software consulting service cards and interactive client success showcases.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/40 p-6 md:p-10 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
                  {["Services - JVO Labs.png", "Case Studies - JVO Labs.png"].map((screen) => (
                    <div key={screen} className="flex flex-col items-center">
                      <div className="w-full rounded-2xl border border-white/10 bg-[#121212] overflow-hidden shadow-xl flex flex-col">
                        <div className="flex items-center gap-1.5 bg-neutral-900 px-3 py-2 border-b border-white/5">
                          <div className="h-2 w-2 rounded-full bg-red-500/60" />
                          <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
                          <div className="h-2 w-2 rounded-full bg-green-500/60" />
                        </div>
                        <div className="relative aspect-[16/10] w-full">
                          <Image
                            src={`/uiux/jvo-labs/${encodeURIComponent(screen)}`}
                            alt={screen}
                            fill
                            sizes="600px"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                      <p className="mt-3 text-center text-xs font-semibold text-gray-300">
                        {screen.replace(' - JVO Labs.png', '').replace('.png', '')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: INSIGHTS & PARTNERSHIPS */}
              <div className="space-y-6 pt-10 pb-12">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                    INSIGHTS & PARTNERSHIPS
                  </span>
                  <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    Insights & Startup Partnerships
                  </h3>
                  <p className="text-sm text-gray-400 md:text-base leading-relaxed">
                    Thought leadership content hub, founder partnership funnel, and office contact channels.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/40 p-6 md:p-10 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6">
                  {["Insights - JVO Labs.png", "Startup Partnership - JVO Labs.png", "Contact - JVO Labs with Office Image.png"].map((screen) => (
                    <div key={screen} className="flex flex-col items-center">
                      <div className="w-full rounded-2xl border border-white/10 bg-[#121212] overflow-hidden shadow-xl flex flex-col">
                        <div className="flex items-center gap-1.5 bg-neutral-900 px-3 py-2 border-b border-white/5">
                          <div className="h-2 w-2 rounded-full bg-red-500/60" />
                          <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
                          <div className="h-2 w-2 rounded-full bg-green-500/60" />
                        </div>
                        <div className="relative aspect-[16/10] w-full">
                          <Image
                            src={`/uiux/jvo-labs/${encodeURIComponent(screen)}`}
                            alt={screen}
                            fill
                            sizes="400px"
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                      <p className="mt-3 text-center text-xs font-semibold text-gray-300">
                        {screen.replace(' - JVO Labs with Office Image.png', '').replace(' - JVO Labs.png', '')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
