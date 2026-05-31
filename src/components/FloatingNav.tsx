"use client";

import { motion } from "framer-motion";
import { User, Briefcase, MonitorSmartphone, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { name: "About", href: "#about", icon: User },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Gallery", href: "#gallery", icon: ImageIcon },
  { name: "UI/UX", href: "#uiux", icon: MonitorSmartphone },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("about");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling down 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Very simple active section detection
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      let current = "about";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0, x: "-50%" }}
      animate={{ 
        y: isVisible ? 0 : 100, 
        opacity: isVisible ? 1 : 0,
        x: "-50%"
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 left-1/2 z-[100] flex items-center gap-2 rounded-full border border-white/10 bg-black/50 p-2 backdrop-blur-xl shadow-2xl"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.href.substring(1);
        const Icon = item.icon;
        
        return (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector(item.href);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className={`relative flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive ? "text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-emerald-400"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span className="hidden sm:block">{item.name}</span>
            </span>
          </a>
        );
      })}
    </motion.div>
  );
}
