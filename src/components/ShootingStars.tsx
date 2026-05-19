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
      const numStars = 25; // Number of shooting stars
      for (let i = 0; i < numStars; i++) {
        newStars.push({
          id: i,
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920) * 1.5,
          y: (Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)) - 500,
          delay: Math.random() * 10,
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
          <div className="h-[2px] w-[150px] bg-gradient-to-r from-transparent via-emerald-500/50 to-emerald-400" />
          {/* Head */}
          <div className="absolute right-0 top-1/2 h-[3px] w-[3px] -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_15px_3px_#10b981]" />
        </div>
      ))}
    </div>
  );
}
