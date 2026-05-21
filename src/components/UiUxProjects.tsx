"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Layout, Smartphone, Globe } from "lucide-react";

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
  "Untitled.png",
];

export default function UiUxProjects() {
  return (
    <section id="uiux" className="relative z-20 min-h-screen bg-transparent px-6 py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
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

        {/* JVO Labs Web Design */}
        <div className="mb-24">
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
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-xl"
              >
                <div className="relative aspect-[16/10] w-full bg-black/50 overflow-hidden">
                  <Image
                    src={`/uiux/jvo-labs/${encodeURIComponent(screen)}`}
                    alt={screen.replace('.png', '')}
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

              </motion.div>
            ))}
          </div>
        </div>

        {/* Lumin Mind Mobile App */}
        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20">
                <Smartphone className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Lumin Mind</h3>
              <p className="text-purple-400/80 text-sm font-medium mt-1 uppercase tracking-wider">Mental Health & Wellness App</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {LUMIN_SCREENS.map((screen, idx) => (
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 5) * 0.05 }}
                className="group relative overflow-hidden rounded-[2rem] border-[6px] border-[#1a1a1a] bg-black shadow-2xl transition-all hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-purple-500/20"
              >
                <div className="relative aspect-[9/19.5] w-full bg-neutral-900">
                  <Image
                    src={`/uiux/lumin-mind/${encodeURIComponent(screen)}`}
                    alt={screen.replace('.png', '')}
                    fill
                    quality={80}
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
