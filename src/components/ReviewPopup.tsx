"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Minus, MessageSquareQuote } from "lucide-react";

const reviews = [
  {
    name: "Sufyan Iftekhar",
    role: "Founder / CEO",
    tag: "UI/UX PROJECT",
    text: "Hannan's work on our UI/UX was exceptional. He translated our complex requirements into a sleek, user-friendly interface that our users love.",
  },
  {
    name: "Ali Raza",
    role: "Marketing Director",
    tag: "META ADS",
    text: "The performance marketing campaigns Hannan ran for us yielded a 3x ROI within the first month. Highly data-driven and creative execution.",
  },
  {
    name: "Sarah Jenkins",
    role: "Growth Manager, USA",
    tag: "BRAND STRATEGY",
    text: "Working with Hannan was a breeze. He understands both the creative and analytical sides of growth. Our brand identity has never looked better.",
  },
  {
    name: "Fatima Tariq",
    role: "Creative Head",
    tag: "VIDEO EDITING",
    text: "His video editing skills brought our brand story to life. The transitions and storytelling were perfectly aligned with our vision.",
  },
  {
    name: "David Chen",
    role: "Product Owner, UK",
    tag: "MOTION GRAPHICS",
    text: "We needed high-quality motion graphics on a tight deadline. Hannan delivered outstanding work that exceeded our expectations without messy prototype code.",
  },
  {
    name: "Usman Khalid",
    role: "E-commerce Founder",
    tag: "CREATIVE ASSETS",
    text: "Hannan revamped our entire brand identity. The new creative assets and ad designs significantly improved our conversion rates.",
  },
];

export default function ReviewPopup({ trigger }: { trigger: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Trigger popup when in view
  useEffect(() => {
    if (trigger && !hasClosed && !isOpen) {
      // Add a small delay so it doesn't pop up instantly
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger, hasClosed, isOpen]);

  // Auto-cycle reviews
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setHasClosed(true);
  };

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col items-end justify-end md:bottom-10 md:right-10">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto relative w-[340px] overflow-hidden rounded-2xl border border-[#10b981]/20 bg-[#0d130f] p-6 shadow-2xl shadow-[#10b981]/10 backdrop-blur-xl sm:w-[400px]"
          >
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="mb-1 text-[10px] font-bold tracking-[0.2em] text-[#10b981]">CLIENT SIGNALS</p>
                <h4 className="text-lg font-bold leading-tight text-white">Founder feedback from<br />high-velocity builds.</h4>
              </div>
              <button
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>

            {/* Review Content */}
            <div className="relative rounded-xl border border-white/5 bg-[#111] p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4 inline-block rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-3 py-1 text-[10px] font-bold tracking-widest text-[#10b981]">
                    {reviews[currentIndex].tag}
                  </div>
                  
                  <p className="mb-6 text-sm leading-relaxed text-gray-300">
                    "{reviews[currentIndex].text}"
                  </p>
                  
                  <div>
                    <p className="font-bold text-white">{reviews[currentIndex].name}</p>
                    <p className="text-xs text-gray-500">{reviews[currentIndex].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="absolute bottom-5 right-5 flex gap-1.5">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? "w-4 bg-[#10b981]" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Re-open button if closed */}
      <AnimatePresence>
        {!isOpen && hasClosed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="pointer-events-auto mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-[#111] px-5 py-3 text-xs font-bold tracking-widest text-white shadow-lg transition-all hover:border-[#10b981]/40 hover:bg-[#10b981]/10"
          >
            <MessageSquareQuote className="h-4 w-4 text-[#10b981]" />
            REVIEWS
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
