"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Layout, 
  Smartphone, 
  Globe, 
  ZoomIn, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Key, 
  Brain, 
  LayoutDashboard, 
  HeartPulse, 
  Trophy 
} from "lucide-react";

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

// Tailwind Color Map for Active/Inactive states
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

const LUMIN_CATEGORIES = {
  All: LUMIN_SCREENS,
  Onboarding: ["Login.png", "Register.png", "OTP Verification.png", "Tell Us About Yourself.png"],
  Diagnostics: ["Facial Scan Screen.png", "Voice Input Screen.png", "Survey Screen.png", "Stress Result Screen.png"],
  "Wellness & Gaming": ["Home Dashboard.png", "Wellness Recommendations.png", "Emotion Locker.png", "Gamification & Rewards.png", "Profile & Wellness Trends.png"]
};

type CategoryKey = keyof typeof LUMIN_CATEGORIES;

export default function UiUxProjects() {
  const [luminLightboxIndex, setLuminLightboxIndex] = useState<number | null>(null);
  const [jvoLightboxIndex, setJvoLightboxIndex] = useState<number | null>(null);

  // State for Interactive Mobile App Simulator
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(2); // Default to Dashboard (index 2)
  const [activePhoneScreen, setActivePhoneScreen] = useState("Home Dashboard.png");
  
  // State for Tabbed Screen Explorer
  const [activeTab, setActiveTab] = useState<CategoryKey>("All");

  const activeFeature = LUMIN_FEATURES[activeFeatureIdx];
  const activeColorTheme = colorMap[activeFeature.accentClass];

  // Set main screen when feature changes
  const selectFeature = (idx: number) => {
    setActiveFeatureIdx(idx);
    setActivePhoneScreen(LUMIN_FEATURES[idx].mainScreen);
  };

  // Keyboard navigation for Lightboxes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLuminLightboxIndex(null);
        setJvoLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        if (luminLightboxIndex !== null) {
          setLuminLightboxIndex((prev) => (prev !== null ? (prev + 1) % LUMIN_SCREENS.length : null));
        } else if (jvoLightboxIndex !== null) {
          setJvoLightboxIndex((prev) => (prev !== null ? (prev + 1) % JVO_SCREENS.length : null));
        }
      } else if (e.key === "ArrowLeft") {
        if (luminLightboxIndex !== null) {
          setLuminLightboxIndex((prev) => (prev !== null ? (prev - 1 + LUMIN_SCREENS.length) % LUMIN_SCREENS.length : null));
        } else if (jvoLightboxIndex !== null) {
          setJvoLightboxIndex((prev) => (prev !== null ? (prev - 1 + JVO_SCREENS.length) % JVO_SCREENS.length : null));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [luminLightboxIndex, jvoLightboxIndex]);

  const openLuminLightboxForScreen = (screenName: string) => {
    const idx = LUMIN_SCREENS.indexOf(screenName);
    if (idx !== -1) {
      setLuminLightboxIndex(idx);
    }
  };

  return (
    <section id="uiux" className="relative z-20 min-h-screen bg-transparent px-6 py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl text-white">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="mb-4 flex items-center gap-4">
            <Layout className="h-8 w-8 text-indigo-400" />
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              UI/UX Design
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
            Professional web and mobile application interfaces focused on user experience, clarity, and modern aesthetics.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* JVO Labs Web Design (Website Mockups inside Browser Frames)                */}
        {/* ========================================================================= */}
        <div className="mb-32">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <Globe className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">JVO Labs</h3>
              <p className="text-emerald-400/80 text-sm font-medium mt-1 uppercase tracking-wider">Corporate Website Redesign</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {JVO_SCREENS.map((screen, idx) => (
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-xl hover:border-emerald-500/20 transition-all duration-300"
              >
                {/* Browser Top Bar Mockup */}
                <div className="flex items-center gap-1.5 bg-neutral-900/80 px-4 py-3 border-b border-white/5 backdrop-blur-sm">
                  <div className="h-2 w-2 rounded-full bg-red-500/60" />
                  <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
                  <div className="h-2 w-2 rounded-full bg-green-500/60" />
                  <div className="ml-4 flex-1 max-w-[240px] h-4 rounded bg-white/5 border border-white/5 text-[9px] text-gray-500 flex items-center px-2.5 font-mono truncate select-none">
                    jvolabs.com/{screen.replace('.png', '').toLowerCase().replace(/\s+/g, '-')}
                  </div>
                </div>

                <div className="relative aspect-[16/10] w-full bg-black/50 overflow-hidden cursor-pointer" onClick={() => setJvoLightboxIndex(idx)}>
                  <Image
                    src={`/uiux/jvo-labs/${encodeURIComponent(screen)}`}
                    alt={screen.replace('.png', '')}
                    fill
                    quality={75}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  
                  {/* Premium Zoom Overlay for Web */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 scale-90 group-hover:scale-100 transition-transform duration-300">
                       <ZoomIn className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold text-emerald-300 mt-2 tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View full screen
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Lumin Mind Mobile App Showcase (Interactive Smartphone Simulator)        */}
        {/* ========================================================================= */}
        <div className="mb-32">
          
          {/* Header section with interactive indicator */}
          <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-500/15 border border-purple-500/30 text-purple-300 animate-pulse select-none">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping" />
                Interactive Simulator
              </span>
            </div>
          </div>

          {/* Interactive Core Box */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start bg-white/[0.01] border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            
            {/* COLUMN 1 (Phone Simulator) - Spans 5 columns */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[500px]">
              
              {/* Dynamic Back-Glow Shadow Effect */}
              <div 
                className="absolute w-[280px] h-[450px] rounded-full blur-[100px] opacity-25 transition-all duration-700 ease-out -z-10"
                style={{
                  background: `radial-gradient(circle, ${activeFeature.glowColor} 0%, transparent 70%)`
                }}
              />

              {/* iPhone device mockup */}
              <div 
                className={`relative overflow-hidden rounded-[2.8rem] border-[10px] border-neutral-900 bg-neutral-950 aspect-[9/19.5] w-[270px] sm:w-[290px] shadow-2xl transition-all duration-500 ease-out border-b-[12px] group cursor-pointer ${activeColorTheme.glow}`}
                onClick={() => openLuminLightboxForScreen(activePhoneScreen)}
              >
                {/* Screen Side Buttons - Visual detailing */}
                <div className="absolute -left-[12px] top-24 w-1.5 h-10 bg-neutral-900 rounded-l" />
                <div className="absolute -left-[12px] top-38 w-1.5 h-14 bg-neutral-900 rounded-l" />
                <div className="absolute -left-[12px] top-56 w-1.5 h-14 bg-neutral-900 rounded-l" />
                <div className="absolute -right-[12px] top-32 w-1.5 h-16 bg-neutral-900 rounded-r" />

                {/* iPhone Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 h-4 w-20 rounded-full bg-neutral-900 z-30 flex items-center justify-between px-2.5 shadow-inner">
                  <div className="h-1.5 w-1.5 rounded-full bg-neutral-800" />
                  <div className="h-0.5 w-6 rounded bg-neutral-800" />
                </div>

                {/* Live Screen Simulator Panel */}
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

                  {/* Zoom Indicator on Hover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white scale-90 group-hover:scale-100 transition-transform duration-300`}>
                      <ZoomIn className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold text-white mt-2 uppercase tracking-widest bg-black/50 px-2.5 py-1 rounded-full border border-white/10">
                      Zoom Screen
                    </span>
                  </div>
                </div>
              </div>

              {/* Caption and Active Screen Name */}
              <div className="mt-6 text-center select-none">
                <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${activeColorTheme.badge} mb-1.5`}>
                  Active Display
                </span>
                <h4 className="text-sm font-semibold text-gray-300">
                  {activePhoneScreen.replace('.png', '')}
                </h4>
              </div>

            </div>

            {/* COLUMN 2 (Interactive Features Menu) - Spans 7 columns */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              
              <div>
                <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-widest font-mono">App Architecture</span>
                <h3 className="text-xl font-bold tracking-tight text-white mt-1 mb-2">Explore Core Experience Modules</h3>
                <p className="text-xs text-gray-400 max-w-xl">
                  Lumin Mind leverages specialized interfaces for psychological data collection and stress de-escalation. Click any module below to explore its screens.
                </p>
              </div>

              {/* Features List Deck */}
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
                      {/* Interactive Accent Glow Line */}
                      {isActive && (
                        <div className={`absolute top-0 left-0 bottom-0 w-[3px] ${colors.accentBg}`} />
                      )}

                      <div className="flex items-start gap-4">
                        {/* Feature Icon Container */}
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                          isActive 
                            ? `${colors.bg} ${colors.border} ${colors.text}` 
                            : "bg-white/5 border-white/5 text-gray-400 group-hover/card:text-gray-300"
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>

                        {/* Title and Short Description */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-bold tracking-wide transition-colors ${isActive ? colors.text : "text-white group-hover/card:text-purple-300"}`}>
                              {feature.title}
                            </h4>
                          </div>
                          <p className="text-[11px] font-medium text-gray-400 mt-0.5">
                            {feature.shortDesc}
                          </p>

                          {/* Expanded detailed description & interactive sub-flow screens */}
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

                                {/* Mini Thumbnails Navigator */}
                                <div className="mt-4">
                                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-2 font-mono">
                                    Simulate Screens in this Flow:
                                  </span>
                                  <div className="flex flex-wrap gap-2">
                                    {/* Include main screen first */}
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

          {/* ========================================================================= */}
          {/* Complete System Screens Tabbed Explorer Grid                             */}
          {/* ========================================================================= */}
          <div className="mt-20">
            <div className="mb-6 text-center">
              <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-widest font-mono">System Directory</span>
              <h3 className="text-xl font-bold tracking-tight text-white mt-1">All Lumin Mind Project Screens</h3>
              <p className="text-xs text-gray-400 max-w-md mx-auto mt-1 leading-relaxed">
                Filter and browse the full application blueprint. Click on any screen card to launch the hi-res zooming Lightbox.
              </p>
            </div>

            {/* Segmented Category Filter Tabs */}
            <div className="flex justify-center mb-8">
              <div className="flex flex-wrap gap-1 bg-white/[0.02] border border-white/5 rounded-2xl p-1 max-w-2xl justify-center">
                {(Object.keys(LUMIN_CATEGORIES) as CategoryKey[]).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`relative px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer select-none ${
                        isActive
                          ? "bg-purple-500/15 border border-purple-500/20 text-purple-300 font-bold scale-102"
                          : "border border-transparent text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filtered Grid Display */}
            <motion.div 
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 py-4"
            >
              <AnimatePresence mode="popLayout">
                {LUMIN_CATEGORIES[activeTab].map((screen) => (
                  <motion.div
                    key={screen}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    {/* Mini device container */}
                    <div 
                      onClick={() => openLuminLightboxForScreen(screen)}
                      className="relative overflow-hidden rounded-2xl border border-white/5 bg-neutral-950 aspect-[9/19.5] w-full shadow-lg group-hover:border-purple-500/30 group-hover:shadow-[0_10px_25px_rgba(168,85,247,0.1)] transition-all duration-300 ease-out cursor-pointer"
                    >
                      {/* Screen Image */}
                      <div className="relative h-full w-full overflow-hidden">
                        <Image
                          src={`/uiux/lumin-mind/${encodeURIComponent(screen)}`}
                          alt={screen}
                          fill
                          quality={75}
                          sizes="180px"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        
                        {/* Zoom overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]">
                          <ZoomIn className="h-5 w-5 text-purple-300 scale-95 group-hover:scale-100 transition-transform" />
                        </div>
                      </div>
                    </div>

                    {/* Miniature caption text */}
                    <p className="mt-2 text-center text-[10px] font-semibold text-gray-500 group-hover:text-purple-300 transition-colors truncate px-1 select-none">
                      {screen.replace('.png', '')}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* LUMIN MIND (MOBILE APP) LIGHTBOX MODAL                                    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {luminLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setLuminLightboxIndex(null)}
          >
            {/* Top Navigation */}
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

            {/* Left/Right Controls inside Lightbox */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLuminLightboxIndex((prev) => (prev !== null ? (prev - 1 + LUMIN_SCREENS.length) % LUMIN_SCREENS.length : null));
              }}
              className="absolute left-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/15 hover:scale-105 cursor-pointer md:flex"
              aria-label="Previous screen"
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
              aria-label="Next screen"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* iPhone Lightbox Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative max-h-[80vh] aspect-[9/19.5] h-full rounded-[2.5rem] border-[8px] border-neutral-900 bg-neutral-950 shadow-2xl overflow-hidden p-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Dynamic Island Inside Lightbox */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 h-4 w-20 rounded-full bg-neutral-900 z-30 flex items-center justify-between px-3">
                <div className="h-1.5 w-1.5 rounded-full bg-neutral-800" />
                <div className="h-1 w-6 rounded bg-neutral-800" />
              </div>

              <div className="relative h-full w-full overflow-hidden rounded-[2.1rem]">
                  <Image
                    src={`/uiux/lumin-mind/${encodeURIComponent(LUMIN_SCREENS[luminLightboxIndex])}`}
                    alt={LUMIN_SCREENS[luminLightboxIndex]}
                    fill
                    quality={75}
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />
              </div>
            </motion.div>

            {/* Screen Name at bottom */}
            <div className="absolute bottom-6 left-0 right-0 z-50 text-center px-6">
              <h4 className="text-lg font-bold text-white tracking-wide drop-shadow-md">
                {LUMIN_SCREENS[luminLightboxIndex].replace('.png', '')}
              </h4>
              <p className="text-xs text-purple-400 font-semibold tracking-widest mt-1 uppercase">
                Mental Health & Wellness App UI
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* JVO LABS (WEB DESIGN) LIGHTBOX MODAL                                      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {jvoLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setJvoLightboxIndex(null)}
          >
            {/* Top Navigation */}
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

            {/* Left/Right Controls inside Lightbox */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setJvoLightboxIndex((prev) => (prev !== null ? (prev - 1 + JVO_SCREENS.length) % JVO_SCREENS.length : null));
              }}
              className="absolute left-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/15 hover:scale-105 cursor-pointer md:flex"
              aria-label="Previous screen"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setJvoLightboxIndex((prev) => (prev !== null ? (prev + 1) % JVO_SCREENS.length : null));
              }}
              className="absolute right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/15 hover:scale-105 cursor-pointer md:flex"
              aria-label="Next screen"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Browser Lightbox Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative max-w-[90vw] max-h-[80vh] aspect-[16/10] w-full rounded-2xl border border-white/10 bg-[#121212] shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Browser bar inside lightbox */}
              <div className="flex items-center gap-1.5 bg-neutral-900/80 px-4 py-3 border-b border-white/5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                <div className="ml-4 flex-1 max-w-[320px] h-5 rounded bg-white/5 border border-white/5 text-xs text-gray-500 flex items-center px-3 font-mono truncate select-none">
                  jvolabs.com/{JVO_SCREENS[jvoLightboxIndex].replace('.png', '').toLowerCase().replace(/\s+/g, '-')}
                </div>
              </div>

              <div className="relative flex-1 w-full bg-black/50 overflow-hidden">
                  <Image
                    src={`/uiux/jvo-labs/${encodeURIComponent(JVO_SCREENS[jvoLightboxIndex])}`}
                    alt={JVO_SCREENS[jvoLightboxIndex]}
                    fill
                    quality={75}
                    priority
                    sizes="100vw"
                    className="object-contain"
                  />
              </div>
            </motion.div>

            {/* Screen Name at bottom */}
            <div className="absolute bottom-6 left-0 right-0 z-50 text-center px-6">
              <h4 className="text-lg font-bold text-white tracking-wide drop-shadow-md">
                {JVO_SCREENS[jvoLightboxIndex].replace('.png', '')}
              </h4>
              <p className="text-xs text-emerald-400 font-semibold tracking-widest mt-1 uppercase">
                Corporate Rebranding Web UI
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Image Preloader for Instant Transitions */}
      <div className="hidden absolute opacity-0 w-0 h-0 pointer-events-none" aria-hidden="true">
        {/* Preload primary screens for all 5 features */}
        {LUMIN_FEATURES.map((f) => (
          <Image 
            key={`preload-main-${f.id}`}
            src={`/uiux/lumin-mind/${encodeURIComponent(f.mainScreen)}`}
            alt="preload"
            width={10}
            height={10}
            priority
          />
        ))}
        {/* Preload sub-screens of the active feature */}
        {activeFeature.subScreens.map((subScreen) => (
          <Image 
            key={`preload-sub-${subScreen}`}
            src={`/uiux/lumin-mind/${encodeURIComponent(subScreen)}`}
            alt="preload"
            width={10}
            height={10}
            priority
          />
        ))}
      </div>

    </section>
  );
}
