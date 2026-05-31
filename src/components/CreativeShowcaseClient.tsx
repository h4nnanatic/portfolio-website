"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon, 
  Sparkles, 
  Info,
  PlusCircle,
  ZoomIn,
  X
} from "lucide-react";
import type { GalleryImage } from "./Gallery";

interface CreativeShowcaseClientProps {
  images: GalleryImage[];
}

export default function CreativeShowcaseClient({ images = [] }: CreativeShowcaseClientProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const featuredImages = useMemo(
    () => images.filter((image) => image.featured),
    [images],
  );

  const safeSlideIndex =
    featuredImages.length > 0 ? activeSlide % featuredImages.length : 0;

  useEffect(() => {
    if (featuredImages.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredImages.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [featuredImages.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, images.length]);

  const goNext = () => {
    if (featuredImages.length === 0) {
      return;
    }
    setActiveSlide((prev) => (prev + 1) % featuredImages.length);
  };

  const goPrev = () => {
    if (featuredImages.length === 0) {
      return;
    }
    setActiveSlide((prev) => (prev - 1 + featuredImages.length) % featuredImages.length);
  };

  const goNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  };

  const goPrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  };

  return (
    <div id="gallery" className="relative z-20 bg-transparent px-6 py-24 border-t border-white/5">
      {/* Dynamic Background Glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[150px]" 
      />

      <div className="relative z-10 mx-auto max-w-7xl text-white">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <div className="mb-4 flex items-center gap-4">
              <ImageIcon className="h-8 w-8 text-emerald-400" />
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                Creative Showcase
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
              Explore custom poster creations, event banners, and promotional brand designs.
            </p>
          </div>
        </motion.div>

        {images.length > 0 ? (
          <section>
            {/* Featured Slider */}
            {featuredImages.length > 0 && (
              <div className="mb-12">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-emerald-400" />
                    Featured Showcase
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/10 cursor-pointer"
                      aria-label="Previous featured work"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/10 cursor-pointer"
                      aria-label="Next featured work"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black">
                  <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={featuredImages[safeSlideIndex]?.src}
                        initial={{ opacity: 0.35, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.2, scale: 0.99 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => {
                          const mainIdx = images.findIndex(img => img.src === featuredImages[safeSlideIndex].src);
                          if (mainIdx >= 0) setLightboxIndex(mainIdx);
                        }}
                      >
                        <Image
                          src={featuredImages[safeSlideIndex].src}
                          alt={featuredImages[safeSlideIndex].alt}
                          fill
                          priority
                          quality={80}
                          sizes="100vw"
                          className="object-contain bg-black/50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-black/20" />
                        
                        {/* Tap to Enlarge Hint on Slider */}
                        <div className="absolute bottom-6 right-6 z-30 hidden items-center gap-2 rounded-full bg-black/60 border border-white/10 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-md pointer-events-none md:flex">
                          <ZoomIn className="h-4 w-4 text-emerald-400" />
                          Click to enlarge
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredImages.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === safeSlideIndex
                          ? "w-8 bg-emerald-400"
                          : "w-2.5 bg-white/35 hover:bg-white/60"
                      }`}
                      aria-label={`Go to featured slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Recent Grid */}
            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-xl font-bold tracking-tight text-white">Recent Designs</h3>
                <p className="text-sm text-gray-400">
                  {images.length} item{images.length === 1 ? "" : "s"}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image, index) => (
                  <motion.article
                    key={image.src}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
                    className="group relative h-96 sm:h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-500 ease-out hover:scale-105 hover:z-30 hover:border-emerald-400/40 hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] cursor-pointer"
                    onClick={() => setLightboxIndex(index)}
                  >
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        quality={85}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      
                      {/* Premium Glassmorphic Hover Magnifier */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 scale-90 group-hover:scale-100 transition-transform duration-300">
                          <ZoomIn className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-semibold text-emerald-300 mt-2 tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Click to open
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        ) : (
          /* Empty active showcase placeholder */
          <section>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-dashed border-emerald-500/20 bg-emerald-950/[0.05] p-8 md:p-12 text-center backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 animate-pulse">
                  <Sparkles className="h-8 w-8 text-emerald-400" />
                </div>
                
                <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl mb-3">
                  Selected Creations
                </h3>
                
                <p className="text-emerald-300/80 font-medium text-sm md:text-base mb-6 leading-relaxed">
                  "Suno! Yahan jald hi mere bilkul naye graphic design projects aur posters showcase honge. Tab tak ke liye, aap niche diye gaye exclusive digital folder ko open karke mera purana graphic design work explore kar sakte hain!"
                </p>

                <p className="text-gray-400 text-xs md:text-sm mb-8">
                  Updating Showcase — I am currently preparing a new collection of posters and banner designs. New works will appear here soon.
                </p>

                <button
                  type="button"
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-5 py-2.5 text-xs font-semibold text-emerald-300 transition-all hover:bg-emerald-500/20 hover:border-emerald-500/50 cursor-pointer"
                >
                  <Info className="h-4 w-4" />
                  {showInstructions ? "Hide instructions" : "How to add new posters?"}
                </button>

                <AnimatePresence>
                  {showInstructions && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-left text-xs text-gray-400"
                    >
                      <h4 className="font-bold text-white mb-2 flex items-center gap-1.5">
                        <PlusCircle className="h-4 w-4 text-emerald-400" />
                        Developer Instructions (Naye Posters Add Karne Ka Tareeqa):
                      </h4>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>
                          Put your new poster images in the <code className="text-emerald-300 bg-black/40 px-1 rounded">public/work/</code> folder of this project.
                        </li>
                        <li>
                          Open <code className="text-emerald-300 bg-black/40 px-1 rounded">src/lib/constants.ts</code>.
                        </li>
                        <li>
                          Add the image filenames in the <code className="text-emerald-300 bg-black/40 px-1 rounded">ACTIVE_POSTERS</code> array.
                        </li>
                        <li>
                          Save the file! The new posters will automatically light up here with responsive layouts and hover effects.
                        </li>
                      </ol>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </section>
        )}

      </div>

      {/* ========================================================================= */}
      {/* IMMERSIVE LIGHTBOX MODAL                                                  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar with counter & controls */}
            <div className="absolute top-4 left-0 right-0 z-50 flex items-center justify-between px-6 text-white md:px-10">
              <span className="font-mono text-sm font-semibold tracking-wider text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                Poster {lightboxIndex + 1} of {images.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/20 hover:scale-105 cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Left/Right Control Arrows inside Lightbox */}
            <button
              type="button"
              onClick={goPrevLightbox}
              className="absolute left-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/15 hover:scale-105 cursor-pointer md:flex"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              type="button"
              onClick={goNextLightbox}
              className="absolute right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/15 hover:scale-105 cursor-pointer md:flex"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Centered Image with spring scale animation */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative max-h-[80vh] max-w-[95vw] aspect-[3/4] w-full"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            >
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
                quality={90}
                priority
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            {/* Title / Description Bar */}
            <div className="absolute bottom-6 left-0 right-0 z-50 text-center px-6">
              <h4 className="text-lg font-bold text-white tracking-wide uppercase drop-shadow-md">
                {images[lightboxIndex].title}
              </h4>
              <p className="text-xs text-emerald-400 font-semibold tracking-widest mt-1 uppercase">
                {images[lightboxIndex].kind} DESIGN
              </p>
            </div>
            
            {/* Mobile swipe controls indicator */}
            <span className="absolute bottom-16 text-center text-xs text-gray-500 font-mono tracking-wider pointer-events-none md:hidden">
              Swipe or tap arrows to navigate
            </span>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
