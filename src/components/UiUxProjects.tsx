"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight,
  Smartphone,
  Globe,
  ZoomIn,
  Key,
  Brain,
  LayoutDashboard,
  HeartPulse,
  Trophy
} from "lucide-react";

// JVO Screens
const JVO_SCREENS = [
  "Homepage with Industries Section - JVO Labs.png",
  "About Us - JVO Labs.png",
  "Services - JVO Labs.png",
  "Case Studies - JVO Labs.png",
  "Insights - JVO Labs.png",
  "Startup Partnership - JVO Labs.png",
  "Contact - JVO Labs with Office Image.png",
  "Body.png",
];

// Lumin Mind Screens
const LUMIN_SCREENS = [
  "Login.png",
  "Register.png",
  "OTP Verification.png",
  "Tell Us About Yourself.png",
  "Home Dashboard.png",
  "Facial Scan Screen.png",
  "Voice Input Screen.png",
  "Survey Screen.png",
  "Stress Result Screen.png",
  "Wellness Recommendations.png",
  "Emotion Locker.png",
  "Gamification & Rewards.png",
  "Profile & Wellness Trends.png",
];

// Interactive Feature Deck for Lumin Mind
const LUMIN_FEATURES = [
  {
    id: "onboarding",
    title: "Onboarding & Core Profile",
    icon: Key,
    shortDesc: "Conversational diagnostics & fast secure authentication.",
    detailedDesc: "A modern, friction-free onboarding flow designed to prevent user drop-off. Featuring secure OTP authentication and a conversational 'Tell Us About Yourself' diagnostic form that captures demographic details and wellness goals to tailor the AI engine.",
    mainScreen: "Tell Us About Yourself.png",
    subScreens: ["Login.png", "Register.png", "OTP Verification.png"],
    accentClass: "indigo",
    glowColor: "rgba(99, 102, 241, 0.4)",
  },
  {
    id: "diagnostics",
    title: "AI Stress Diagnostics",
    icon: Brain,
    shortDesc: "Computer vision facial scan & vocal pitch sentiment tracking.",
    detailedDesc: "Pioneering mental health diagnostics through modern tech: a real-time computer vision Facial Scan that tracks micro-expression stressors, an audio Voice Input sentiment analysis, and standard clinical mental health survey checkups that produce a highly detailed stress report.",
    mainScreen: "Facial Scan Screen.png",
    subScreens: ["Voice Input Screen.png", "Survey Screen.png", "Stress Result Screen.png"],
    accentClass: "purple",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
  {
    id: "dashboard",
    title: "Intelligent Health Dashboard",
    icon: LayoutDashboard,
    shortDesc: "Aggregating daily stress indexes and biological metrics.",
    detailedDesc: "The core product cockpit that integrates all assessment metrics. It visualizes the user's weekly stress indexes, heart rate variability, sleep trends, and emotional progress calendar in clean, modern charts, providing single-tap access to professional resources and quick de-escalation tools.",
    mainScreen: "Home Dashboard.png",
    subScreens: ["Profile & Wellness Trends.png"],
    accentClass: "emerald",
    glowColor: "rgba(16, 185, 129, 0.4)",
  },
  {
    id: "interventions",
    title: "Personalized Support & Journal",
    icon: HeartPulse,
    shortDesc: "Therapeutic exercises and secure encrypted journaling.",
    detailedDesc: "Custom AI-driven coping exercises, including guided breathing metrics, sound therapy tracks, and mood stabilizers. Also contains a biometrically secured 'Emotion Locker' — an encrypted digital space to safely document private thoughts.",
    mainScreen: "Wellness Recommendations.png",
    subScreens: ["Emotion Locker.png"],
    accentClass: "pink",
    glowColor: "rgba(236, 72, 153, 0.4)",
  },
  {
    id: "gamification",
    title: "Gamified Habits & Streaks",
    icon: Trophy,
    shortDesc: "Maintaining mental resilience through reward pathways.",
    detailedDesc: "Gamifying standard therapy and mood-tracking habits. Users sustain active mindfulness streaks, achieve beautifully designed milestone badges, earn experience points to customize their profile, and interact in supportive peer-to-peer wellness challenges.",
    mainScreen: "Gamification & Rewards.png",
    subScreens: [],
    accentClass: "amber",
    glowColor: "rgba(245, 158, 11, 0.4)",
  }
];

const colorMap: Record<string, {
  text: string;
  bg: string;
  border: string;
  badge: string;
  glow: string;
  hoverBorder: string;
  activeBorder: string;
  gradient: string;
  accentBg: string;
}> = {
  indigo: {
    text: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    badge: "bg-indigo-500/20 border-indigo-500/30 text-indigo-300",
    glow: "shadow-indigo-500/20",
    hoverBorder: "hover:border-indigo-500/40",
    activeBorder: "border-indigo-500/40",
    gradient: "from-indigo-500/20 to-transparent",
    accentBg: "bg-indigo-500",
  },
  purple: {
    text: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    badge: "bg-purple-500/20 border-purple-500/30 text-purple-300",
    glow: "shadow-purple-500/20",
    hoverBorder: "hover:border-purple-500/40",
    activeBorder: "border-purple-500/40",
    gradient: "from-purple-500/20 to-transparent",
    accentBg: "bg-purple-500",
  },
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    badge: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300",
    glow: "shadow-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/40",
    activeBorder: "border-emerald-500/40",
    gradient: "from-emerald-500/20 to-transparent",
    accentBg: "bg-emerald-500",
  },
  pink: {
    text: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    badge: "bg-pink-500/20 border-pink-500/30 text-pink-300",
    glow: "shadow-pink-500/20",
    hoverBorder: "hover:border-pink-500/40",
    activeBorder: "border-pink-500/40",
    gradient: "from-pink-500/20 to-transparent",
    accentBg: "bg-pink-500",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    badge: "bg-amber-500/20 border-amber-500/30 text-amber-300",
    glow: "shadow-amber-500/20",
    hoverBorder: "hover:border-amber-500/40",
    activeBorder: "border-amber-500/40",
    gradient: "from-amber-500/20 to-transparent",
    accentBg: "bg-amber-500",
  }
};

export default function UiUxProjects() {
  const [isHerAidOpen, setIsHerAidOpen] = useState(false);
  const [luminLightboxIndex, setLuminLightboxIndex] = useState<number | null>(null);
  const [jvoLightboxIndex, setJvoLightboxIndex] = useState<number | null>(null);

  // State for Lumin Mind Simulator
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(2);
  const [activePhoneScreen, setActivePhoneScreen] = useState("Home Dashboard.png");

  const activeFeature = LUMIN_FEATURES[activeFeatureIdx];
  const activeColorTheme = colorMap[activeFeature.accentClass];

  const selectFeature = (idx: number) => {
    setActiveFeatureIdx(idx);
    setActivePhoneScreen(LUMIN_FEATURES[idx].mainScreen);
  };

  // Keyboard Navigation & Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsHerAidOpen(false);
        setLuminLightboxIndex(null);
        setJvoLightboxIndex(null);
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
        {/* HERAID CASE STUDY SHOWCASE CARD                                           */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="group relative rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 md:p-10 shadow-2xl mb-24 transition-all duration-300 hover:border-white/20"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div>
                <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-cyan-300">
                  HEALTHCARE & SAFETY UX CASE STUDY
                </span>
              </div>

              <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl leading-tight">
                HerAid — Women's Safety & Health App
              </h3>

              <p className="text-sm leading-relaxed text-gray-400 md:text-base">
                HerAid is a women's safety and menstruation-tracking platform designed to connect users with safety NGOs, track personal wellness metrics, and ensure privacy-first health management.
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
                  • WIREFRAMING
                </span>
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                  • PROTOTYPING
                </span>
                <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
                  • USER RESEARCH
                </span>
              </div>

              {/* View Case Study Action Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setIsHerAidOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#10b981] px-7 py-3.5 text-sm font-extrabold uppercase tracking-wide text-black shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 hover:scale-105 hover:bg-[#059669] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] cursor-pointer"
                >
                  <span>VIEW CASE STUDY</span>
                  <ArrowUpRight className="h-4 w-4 stroke-[3]" />
                </button>
              </div>
            </div>

            {/* Right Card Media Preview */}
            <div 
              onClick={() => setIsHerAidOpen(true)}
              className="lg:col-span-7 relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl group/img cursor-pointer"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/uiux/heraid/card-preview.png"
                  alt="HerAid Case Study Card Preview"
                  fill
                  quality={85}
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-103"
                />

                {/* Hover Glow Lightbox Cue */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover/img:opacity-100 backdrop-blur-[2px]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-xl transition-transform duration-300 group-hover/img:scale-110">
                    <ZoomIn className="h-6 w-6" />
                  </div>
                  <span className="mt-3 text-xs font-bold uppercase tracking-widest text-emerald-300 bg-black/60 px-3 py-1 rounded-full border border-white/10">
                    Explore Full Case Study
                  </span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* LUMIN MIND INTERACTIVE APP SIMULATOR SHOWCASE                            */}
        {/* ========================================================================= */}
        <div className="mb-24">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20">
                <Smartphone className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Lumin Mind</h3>
                <p className="text-purple-400/80 text-sm font-medium mt-1 uppercase tracking-wider">Mental Health & Wellness App</p>
              </div>
            </div>

            <div className="self-start md:self-auto">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-500/15 border border-purple-500/30 text-purple-300 animate-pulse select-none">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping" />
                Interactive Simulator
              </span>
            </div>
          </div>

          {/* Simulator Box */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start bg-white/[0.01] border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            {/* Phone Frame */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[500px]">
              <div 
                className="absolute w-[280px] h-[450px] rounded-full blur-[100px] opacity-25 transition-all duration-700 ease-out -z-10"
                style={{ background: `radial-gradient(circle, ${activeFeature.glowColor} 0%, transparent 70%)` }}
              />

              <div 
                className={`relative overflow-hidden rounded-[2.8rem] border-[10px] border-neutral-900 bg-neutral-950 aspect-[9/19.5] w-[270px] sm:w-[290px] shadow-2xl transition-all duration-500 ease-out border-b-[12px] group cursor-pointer ${activeColorTheme.glow}`}
                onClick={() => setLuminLightboxIndex(LUMIN_SCREENS.indexOf(activePhoneScreen))}
              >
                <div className="absolute top-3 left-1/2 -translate-x-1/2 h-4 w-20 rounded-full bg-neutral-900 z-30 flex items-center justify-between px-2.5 shadow-inner">
                  <div className="h-1.5 w-1.5 rounded-full bg-neutral-800" />
                  <div className="h-0.5 w-6 rounded bg-neutral-800" />
                </div>

                <div className="relative h-full w-full overflow-hidden bg-neutral-900">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePhoneScreen}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={`/uiux/lumin-mind/${encodeURIComponent(activePhoneScreen)}`}
                        alt={activePhoneScreen.replace('.png', '')}
                        fill
                        priority
                        quality={75}
                        sizes="290px"
                        className="object-cover object-center"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold text-white mt-2 uppercase tracking-widest bg-black/50 px-2.5 py-1 rounded-full border border-white/10">
                      Zoom Screen
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center select-none">
                <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${activeColorTheme.badge} mb-1.5`}>
                  Active Display
                </span>
                <h4 className="text-sm font-semibold text-gray-300">
                  {activePhoneScreen.replace('.png', '')}
                </h4>
              </div>
            </div>

            {/* Modules Selector */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div>
                <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-widest font-mono">App Architecture</span>
                <h3 className="text-xl font-bold tracking-tight text-white mt-1 mb-2">Explore Core Experience Modules</h3>
                <p className="text-xs text-gray-400 max-w-xl">
                  Lumin Mind leverages specialized interfaces for psychological data collection and stress de-escalation. Click any module below to explore its screens.
                </p>
              </div>

              <div className="flex flex-col gap-3.5 mt-2">
                {LUMIN_FEATURES.map((feature, idx) => {
                  const Icon = feature.icon;
                  const isActive = activeFeatureIdx === idx;
                  const colors = colorMap[feature.accentClass];

                  return (
                    <div
                      key={feature.id}
                      onClick={() => selectFeature(idx)}
                      className={`group/card relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 cursor-pointer ${
                        isActive 
                          ? `${colors.activeBorder} bg-white/[0.03] shadow-md` 
                          : "border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10"
                      }`}
                    >
                      {isActive && <div className={`absolute top-0 left-0 bottom-0 w-[3px] ${colors.accentBg}`} />}

                      <div className="flex items-start gap-4">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                          isActive 
                            ? `${colors.bg} ${colors.border} ${colors.text}` 
                            : "bg-white/5 border-white/5 text-gray-400 group-hover/card:text-gray-300"
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="flex-1">
                          <h4 className={`text-sm font-bold tracking-wide transition-colors ${isActive ? colors.text : "text-white group-hover/card:text-purple-300"}`}>
                            {feature.title}
                          </h4>
                          <p className="text-[11px] font-medium text-gray-400 mt-0.5">
                            {feature.shortDesc}
                          </p>

                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="overflow-hidden"
                              >
                                <p className="text-[11px] leading-relaxed text-gray-400 mt-2.5 border-t border-white/5 pt-2.5">
                                  {feature.detailedDesc}
                                </p>

                                <div className="mt-4">
                                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-2 font-mono">
                                    Simulate Screens in this Flow:
                                  </span>
                                  <div className="flex flex-wrap gap-2">
                                    {[feature.mainScreen, ...feature.subScreens].map((screen) => {
                                      const isCurrent = activePhoneScreen === screen;
                                      return (
                                        <button
                                          key={screen}
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setActivePhoneScreen(screen);
                                          }}
                                          className={`relative px-2.5 py-1.5 rounded-lg border text-[10px] font-semibold transition-all cursor-pointer ${
                                            isCurrent
                                              ? `${colors.bg} ${colors.border} ${colors.text} shadow-sm font-bold scale-102`
                                              : "border-white/5 bg-neutral-900/60 text-gray-400 hover:text-white hover:border-white/15"
                                          }`}
                                        >
                                          {screen.replace('.png', '')}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* JVO LABS WEB DESIGN SHOWCASE                                              */}
        {/* ========================================================================= */}
        <div>
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <Globe className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">JVO Labs Web UI</h3>
                <p className="text-emerald-400/80 text-sm font-medium mt-1 uppercase tracking-wider">Corporate Web Platform Design</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {JVO_SCREENS.slice(0, 4).map((screen, idx) => (
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] shadow-xl cursor-pointer hover:border-emerald-500/40 transition-all"
                onClick={() => setJvoLightboxIndex(idx)}
              >
                <div className="flex items-center gap-1.5 bg-neutral-900 px-4 py-2.5 border-b border-white/5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  <div className="ml-3 flex-1 max-w-[240px] h-4 rounded bg-white/5 border border-white/5 text-[10px] text-gray-500 flex items-center px-2 font-mono truncate">
                    jvolabs.com/{screen.replace('.png', '').toLowerCase().replace(/\s+/g, '-')}
                  </div>
                </div>

                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={`/uiux/jvo-labs/${encodeURIComponent(screen)}`}
                    alt={screen}
                    fill
                    quality={80}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                      <ZoomIn className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* HERAID CASE STUDY OVERLAY MODAL                                           */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isHerAidOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-[#080808]/98 overflow-y-auto backdrop-blur-2xl p-4 md:p-12"
          >
            {/* Fixed Close Button */}
            <button
              type="button"
              onClick={() => setIsHerAidOpen(false)}
              className="fixed top-6 right-6 z-[350] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white transition-all hover:bg-white/20 hover:scale-110 cursor-pointer shadow-2xl"
              aria-label="Close Case Study"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mx-auto max-w-6xl space-y-16 py-8">
              
              {/* HERO COVER BANNER (Screenshot 2 Top) */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl min-h-[380px] md:min-h-[500px]">
                <Image
                  src="/uiux/heraid/hero-banner.png"
                  alt="HerAid Case Study Hero Banner"
                  fill
                  quality={90}
                  priority
                  sizes="100vw"
                  className="object-cover object-center"
                />
                
                {/* Gradient overlay for crisp typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12">
                  <span className="inline-block rounded-full border border-cyan-500/40 bg-cyan-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-300 self-start mb-3">
                    HEALTHCARE & SAFETY UX CASE STUDY
                  </span>
                  <h1 className="text-3xl font-extrabold text-white md:text-6xl tracking-tight leading-tight">
                    HerAid — Women's Safety & Health App
                  </h1>
                </div>
              </div>

              {/* PROJECT BRIEF & OVERVIEW + SKILLS & TOOLS (Screenshot 2 Bottom) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-8 space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                    Project Brief & Overview
                  </h3>
                  <p className="text-base leading-relaxed text-gray-300 md:text-lg">
                    HerAid is a women's safety and menstruation-tracking platform designed to connect users with safety NGOs, track personal wellness metrics, and ensure privacy-first health management.
                  </p>
                </div>

                <div className="md:col-span-4 rounded-2xl border border-white/10 bg-[#111111] p-6 space-y-3 shadow-xl">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 font-mono">
                    SKILLS & TOOLS
                  </h4>
                  <ul className="space-y-2 text-sm font-semibold text-emerald-400">
                    <li>Figma</li>
                    <li>UI/UX Design</li>
                    <li>Wireframing</li>
                    <li>Prototyping</li>
                    <li>User Research</li>
                  </ul>
                </div>
              </div>

              {/* SECTION 1: ONBOARDING FLOW (Screenshot 3) */}
              <div className="space-y-6 pt-6">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                    ONBOARDING FLOW
                  </span>
                  <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    Onboarding Flow
                  </h3>
                  <p className="text-sm text-gray-400 md:text-base leading-relaxed">
                    The initial greeting and secure entry channels designed to welcome users and capture essential setup parameters.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/40 p-2 md:p-6 overflow-hidden shadow-2xl">
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl">
                    <Image
                      src="/uiux/heraid/onboarding-flow.png"
                      alt="Onboarding Flow Showcase"
                      fill
                      quality={90}
                      sizes="100vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: CORE DASHBOARDS & FEATURES (Screenshot 4) */}
              <div className="space-y-6 pt-10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                    CORE DASHBOARDS & FEATURES
                  </span>
                  <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    Core Dashboards & Features
                  </h3>
                  <p className="text-sm text-gray-400 md:text-base leading-relaxed">
                    The central workspace where users interact with critical data visualization, tracking widgets, and main utilities.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/40 p-2 md:p-6 overflow-hidden shadow-2xl">
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl">
                    <Image
                      src="/uiux/heraid/core-dashboards.png"
                      alt="Core Dashboards Showcase"
                      fill
                      quality={90}
                      sizes="100vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: ACCOUNT & SYSTEM SETTINGS (Screenshot 5) */}
              <div className="space-y-6 pt-10 pb-12">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                    ACCOUNT & SYSTEM SETTINGS
                  </span>
                  <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    Account & System Settings
                  </h3>
                  <p className="text-sm text-gray-400 md:text-base leading-relaxed">
                    Advanced user control layouts, notifications settings, privacy tools, and system preferences.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/40 p-2 md:p-6 overflow-hidden shadow-2xl">
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl">
                    <Image
                      src="/uiux/heraid/account-settings.png"
                      alt="Account & System Settings Showcase"
                      fill
                      quality={90}
                      sizes="100vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LUMIN MIND LIGHTBOX */}
      <AnimatePresence>
        {luminLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setLuminLightboxIndex(null)}
          >
            <div className="absolute top-4 left-0 right-0 z-50 flex items-center justify-between px-6 text-white md:px-10">
              <span className="font-mono text-xs font-semibold tracking-widest text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full uppercase">
                Lumin Mind • Screen {luminLightboxIndex + 1} of {LUMIN_SCREENS.length}
              </span>
              <button
                type="button"
                onClick={() => setLuminLightboxIndex(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/20 hover:scale-105 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLuminLightboxIndex((prev) => (prev !== null ? (prev - 1 + LUMIN_SCREENS.length) % LUMIN_SCREENS.length : null));
              }}
              className="absolute left-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/15 hover:scale-105 cursor-pointer md:flex"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLuminLightboxIndex((prev) => (prev !== null ? (prev + 1) % LUMIN_SCREENS.length : null));
              }}
              className="absolute right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/15 hover:scale-105 cursor-pointer md:flex"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative max-h-[80vh] aspect-[9/19.5] h-full rounded-[2.5rem] border-[8px] border-neutral-900 bg-neutral-950 shadow-2xl overflow-hidden p-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[2.1rem]">
                <Image
                  src={`/uiux/lumin-mind/${encodeURIComponent(LUMIN_SCREENS[luminLightboxIndex])}`}
                  alt={LUMIN_SCREENS[luminLightboxIndex]}
                  fill
                  quality={85}
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* JVO LIGHTBOX */}
      <AnimatePresence>
        {jvoLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setJvoLightboxIndex(null)}
          >
            <div className="absolute top-4 left-0 right-0 z-50 flex items-center justify-between px-6 text-white md:px-10">
              <span className="font-mono text-xs font-semibold tracking-widest text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase">
                JVO Labs • Screen {jvoLightboxIndex + 1} of {JVO_SCREENS.length}
              </span>
              <button
                type="button"
                onClick={() => setJvoLightboxIndex(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/20 hover:scale-105 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative max-w-[90vw] max-h-[80vh] aspect-[16/10] w-full rounded-2xl border border-white/10 bg-[#121212] shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 w-full bg-black/50 overflow-hidden">
                <Image
                  src={`/uiux/jvo-labs/${encodeURIComponent(JVO_SCREENS[jvoLightboxIndex])}`}
                  alt={JVO_SCREENS[jvoLightboxIndex]}
                  fill
                  quality={85}
                  priority
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
