"use client";

import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export default function ShootingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const numStars = 60; // Increased for a continuous shower
      for (let i = 0; i < numStars; i++) {
        newStars.push({
          id: i,
          x: Math.random() * ((typeof window !== 'undefined' ? window.innerWidth : 1920) + 1000) - 200, 
          y: Math.random() * ((typeof window !== 'undefined' ? window.innerHeight : 1080) + 500) - 1000,
          delay: -(Math.random() * 25), // Negative delay so they are already mid-flight on load!
          duration: Math.random() * 6 + 6, // 6 to 12 seconds duration (slower speed)
        });
      }
      setStars(newStars);
    };

    generateStars();
    
    window.addEventListener("resize", generateStars);
    return () => window.removeEventListener("resize", generateStars);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-shooting-star opacity-0"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        >
          {/* Tail */}
          <div className="h-[3px] w-[250px] bg-gradient-to-r from-transparent via-emerald-400/80 to-emerald-300" />
          {/* Head */}
          <div className="absolute right-0 top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-emerald-100 shadow-[0_0_20px_5px_#10b981]" />
        </div>
      ))}
    </div>
  );
}
