"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      if (!isHovering) setIsHovering(true);
    };

    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovering]);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden mix-blend-screen">
      {/* Primary Emerald Glow */}
      <motion.div
        className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full blur-[120px]"
        style={{ 
          background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(16,185,129,0) 70%)',
        }}
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
          opacity: isHovering ? 1 : 0
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />
      
      {/* Secondary Teal Glow that trails slightly */}
      <motion.div
        className="absolute left-0 top-0 h-[900px] w-[900px] rounded-full blur-[150px]"
        style={{ 
          background: 'radial-gradient(circle, rgba(4,120,87,0.3) 0%, rgba(4,120,87,0) 70%)',
        }}
        animate={{
          x: mousePosition.x - 450,
          y: mousePosition.y - 450,
          opacity: isHovering ? 1 : 0
        }}
        transition={{ type: "tween", ease: "circOut", duration: 1.5 }}
      />
    </div>
  );
}
