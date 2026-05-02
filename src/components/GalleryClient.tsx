"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import type { GalleryImage } from "./Gallery";

type GalleryFilter = "all" | "poster" | "banner" | "branding";

interface GalleryClientProps {
  images: GalleryImage[];
}

const FILTERS: { id: GalleryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "poster", label: "Posters" },
  { id: "banner", label: "Banners" },
  { id: "branding", label: "Branding" },
];


export default function GalleryClient({ images }: GalleryClientProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("all");
  const [activeSlide, setActiveSlide] = useState(0);

  const featuredImages = useMemo(
    () => images.filter((image) => image.featured),
    [images],
  );

  const filteredImages = useMemo(() => {
    if (activeFilter === "all") {
      return images.filter((image) => !image.featured);
    }

    return images.filter((image) => image.kind === activeFilter);
  }, [activeFilter, images]);

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

  return (
    <div className="relative z-20 min-h-screen bg-[#0a0a0a] px-6 py-32">
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[150px]" 
      />

      <div className="relative z-10 mx-auto max-w-7xl text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <div className="mb-4 flex items-center gap-4">
              <ImageIcon className="h-8 w-8 text-neutral-400" />
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                Selected Works
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
              Curated poster, banner, and branding work arranged for a cleaner
              presentation.
            </p>
          </div>
        </motion.div>

        {featuredImages.length > 0 ? (
          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                Featured Highlights
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/10"
                  aria-label="Previous featured work"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/10"
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
                    className="absolute inset-0"
                  >
                    <Image
                      src={featuredImages[safeSlideIndex].src}
                      alt={featuredImages[safeSlideIndex].alt}
                      fill
                      priority
                      quality={74}
                      sizes="100vw"
                      className="object-contain bg-black/50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-black/20" />
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
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/35 hover:bg-white/60"
                  }`}
                  aria-label={`Go to featured slide ${index + 1}`}
                />
              ))}
            </div>
          </section>
        ) : null}

        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                      isActive
                        ? "border-emerald-300/80 bg-emerald-400/20 text-emerald-200"
                        : "border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <p className="text-sm text-gray-400">
              {filteredImages.length} item
              {filteredImages.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredImages.map((image, index) => (
              <motion.article
                key={image.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
              >
                <div className="relative h-72 w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={70}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-all duration-700 group-hover:object-contain group-hover:scale-100 group-active:object-contain group-active:scale-100"
                  />
                </div>


              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
