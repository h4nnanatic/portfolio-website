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
      const numStars = 40; // Number of shooting stars
      for (let i = 0; i < numStars; i++) {
        newStars.push({
          id: i,
          x: (Math.random() * 3000) - 500, // Spread widely across the width
          y: (Math.random() * 2000) - 1000, // Spread from top to bottom
          delay: Math.random() * 12,
          duration: Math.random() * 2 + 2, 
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
