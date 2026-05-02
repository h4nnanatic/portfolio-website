"use client";

import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-white/5 bg-[#050505] py-8 text-center">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-6">
        <p className="flex items-center gap-2 text-sm text-gray-500">
          Crafted with <Heart className="h-4 w-4 text-emerald-500" fill="currentColor" /> by Hannan Rasool
        </p>
        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
