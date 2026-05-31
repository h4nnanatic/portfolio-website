"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon, 
  FolderClosed, 
  FolderOpen, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Layers, 
  Info,
  ArrowRight,
  PlusCircle,
  FileImage
} from "lucide-react";
import type { GalleryImage } from "./Gallery";

type GalleryFilter = "all" | "poster" | "banner" | "branding";

interface GalleryClientProps {
  activeImages: GalleryImage[];
  archivedImages: GalleryImage[];
}

const FILTERS: { id: GalleryFilter; label: string }[] = [
  { id: "all", label: "All Works" },
  { id: "poster", label: "Posters" },
  { id: "banner", label: "Banners" },
  { id: "branding", label: "Branding" },
];

export default function GalleryClient({ activeImages = [], archivedImages = [] }: GalleryClientProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("all");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  // Active Showcase calculations
  const activeFeatured = useMemo(
    () => activeImages.filter((image) => image.featured),
    [activeImages],
  );

  const filteredActiveImages = useMemo(() => {
    if (activeFilter === "all") {
      return activeImages.filter((image) => !image.featured);
    }
    return activeImages.filter((image) => image.kind === activeFilter);
  }, [activeFilter, activeImages]);

  // Archived (Folder) calculations
  const filteredArchivedImages = useMemo(() => {
    if (activeFilter === "all") {
      return archivedImages;
    }
    return archivedImages.filter((image) => image.kind === activeFilter);
  }, [activeFilter, archivedImages]);

  const safeSlideIndex =
    activeFeatured.length > 0 ? activeSlide % activeFeatured.length : 0;

  useEffect(() => {
    if (activeFeatured.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % activeFeatured.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [activeFeatured.length]);

  const goNext = () => {
    if (activeFeatured.length === 0) {
      return;
    }
    setActiveSlide((prev) => (prev + 1) % activeFeatured.length);
  };

  const goPrev = () => {
    if (activeFeatured.length === 0) {
      return;
    }
    setActiveSlide((prev) => (prev - 1 + activeFeatured.length) % activeFeatured.length);
  };

  return (
    <div id="gallery" className="relative z-20 min-h-screen bg-transparent px-6 py-32 border-t border-white/5">
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

        {/* ========================================================================= */}
        {/* ACTIVE SHOWCASE SECTION (NEW POSTERS)                                     */}
        {/* ========================================================================= */}
        
        {activeImages.length > 0 ? (
          <section className="mb-16">
            {/* Featured Slider for Active Images */}
            {activeFeatured.length > 0 && (
              <div className="mb-12">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-emerald-400" />
                    Featured Work
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
                        key={activeFeatured[safeSlideIndex]?.src}
                        initial={{ opacity: 0.35, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.2, scale: 0.99 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={activeFeatured[safeSlideIndex].src}
                          alt={activeFeatured[safeSlideIndex].alt}
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
                  {activeFeatured.map((image, index) => (
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

            {/* Grid for Active Images */}
            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-xl font-bold tracking-tight text-white">Recent Designs</h3>
                <p className="text-sm text-gray-400">
                  {filteredActiveImages.length} item{filteredActiveImages.length === 1 ? "" : "s"}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredActiveImages.map((image, index) => (
                  <motion.article
                    key={image.src}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-emerald-500/20"
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
            </div>
          </section>
        ) : (
          /* Empty Active Showcase Placeholder - Ultra Premium Design */
          <section className="mb-16">
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

        {/* ========================================================================= */}
        {/* ARCHIVED SHOWCASE SECTION (LEGACY GRAPHIC FOLDER)                          */}
        {/* ========================================================================= */}
        
        <section className="mt-12 border-t border-white/5 pt-12">
          
          {/* Folder Card Toggle */}
          <motion.div
            layout="position"
            onClick={() => setIsFolderOpen(!isFolderOpen)}
            className={`relative overflow-hidden rounded-3xl border transition-all duration-500 p-8 md:p-10 cursor-pointer shadow-2xl group ${
              isFolderOpen 
                ? "border-emerald-500/30 bg-emerald-950/[0.04]" 
                : "border-white/10 bg-white/[0.01] hover:border-emerald-500/20 hover:bg-white/[0.02]"
            }`}
          >
            {/* Glowing background on hover */}
            <div className="absolute -inset-1 rounded-full bg-emerald-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-105 transition-transform duration-300">
                  {isFolderOpen ? (
                    <FolderOpen className="h-8 w-8 text-emerald-400" />
                  ) : (
                    <FolderClosed className="h-8 w-8 text-emerald-400" />
                  )}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                      Graphic Design Archives
                    </h3>
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 flex items-center gap-1">
                      <FileImage className="h-3 w-3" />
                      {archivedImages.length} items
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 max-w-xl">
                    Collection of older posters, banners, and logo branding designs (2024 - 2025).
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-white/10 cursor-pointer"
              >
                {isFolderOpen ? (
                  <>
                    Close Folder
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Open Folder
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Folder Expanded Grid */}
          <AnimatePresence initial={false}>
            {isFolderOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden mt-8"
              >
                <div className="rounded-3xl border border-white/5 bg-white/[0.01] p-6 md:p-8">
                  
                  {/* Breadcrumbs Navigation */}
                  <div className="mb-8 flex items-center gap-2 text-xs font-mono text-gray-500 border-b border-white/5 pb-4">
                    <span className="hover:text-emerald-400 transition-colors cursor-pointer">root</span>
                    <span>/</span>
                    <span className="hover:text-emerald-400 transition-colors cursor-pointer">portfolio</span>
                    <span>/</span>
                    <span className="text-emerald-300 font-semibold bg-emerald-500/5 px-2 py-0.5 rounded">graphic-design-archive-v1</span>
                  </div>

                  {/* Category Filters inside Folder */}
                  <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {FILTERS.map((filter) => {
                        const isActive = activeFilter === filter.id;
                        return (
                          <button
                            key={filter.id}
                            type="button"
                            onClick={() => setActiveFilter(filter.id)}
                            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
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

                    <p className="text-xs text-gray-500 font-mono">
                      FOUND: {filteredArchivedImages.length} items
                    </p>
                  </div>

                  {/* Responsive Grid */}
                  {filteredArchivedImages.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredArchivedImages.map((image, index) => (
                        <motion.article
                          key={image.src}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
                          className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/20 transition-all"
                        >
                          <div className="relative h-72 w-full">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              quality={70}
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-all duration-700 group-hover:object-contain group-hover:scale-100 group-active:object-contain group-active:scale-100 bg-neutral-950/20"
                            />
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500 text-sm">
                      No archived items match this category.
                    </div>
                  )}

                  {/* Close button at bottom of folder */}
                  <div className="mt-12 flex justify-center border-t border-white/5 pt-8">
                    <button
                      type="button"
                      onClick={() => {
                        setIsFolderOpen(false);
                        const element = document.getElementById("gallery");
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-6 py-3 text-xs font-semibold text-white transition-all hover:bg-white/10 cursor-pointer"
                    >
                      <FolderClosed className="h-4 w-4" />
                      Close Archive Folder
                    </button>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </section>

      </div>
    </div>
  );
}
