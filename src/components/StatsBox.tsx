"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
  from: number;
  to: number;
  decimals?: number;
  duration?: number;
}

function Counter({ from, to, decimals = 0, duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [count, to, duration, isInView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function StatsBox() {
  const stats = [
    { value: 20, label: "HAPPY CLIENTS", plus: true, decimals: 0 },
    { value: 5, label: "PROJECTS DONE", plus: true, decimals: 0 },
    { value: 1.5, label: "YEARS EXPERIENCE", plus: true, decimals: 1 },
    { value: 15, label: "CAMPAIGNS RUN", plus: true, decimals: 0 },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-emerald-900/30 bg-[#0d130f] p-8 shadow-2xl shadow-emerald-900/20">
      {/* Subtle green glow background */}
      <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent blur-2xl" />
      
      <div className="relative z-10 grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-emerald-900/50">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex flex-col items-center justify-center relative">
            <div className="flex items-baseline text-4xl font-bold text-emerald-400 md:text-5xl">
              <Counter from={0} to={stat.value} decimals={stat.decimals} />
              {stat.plus && <span className="ml-1 text-3xl md:text-4xl text-emerald-400">+</span>}
            </div>
            <p className="mt-2 text-[10px] font-semibold tracking-[0.2em] text-gray-300 sm:text-xs text-center">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
