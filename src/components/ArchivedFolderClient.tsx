"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { 
  FolderClosed, 
  FolderOpen, 
  ChevronDown, 
  ChevronUp, 
  FileImage,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import type { GalleryImage } from "./Gallery";

type GalleryFilter = "all" | "poster" | "banner" | "branding";

interface ArchivedFolderClientProps {
  images: GalleryImage[];
}

const FILTERS: { id: GalleryFilter; label: string }[] = [
  { id: "all", label: "All Works" },
  { id: "poster", label: "Posters" },
  { id: "banner", label: "Banners" },
  { id: "branding", label: "Branding" },
];

export default function ArchivedFolderClient({ images = [] }: ArchivedFolderClientProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("all");
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (activeFilter === "all") {
      return images;
    }
    return images.filter((image) => image.kind === activeFilter);
  }, [activeFilter, images]);

  // Keyboard navigation for Lightbox inside Folder
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredImages.length : null));
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredImages.length]);

  const goNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredImages.length : null));
  };

  const goPrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null));
  };

  return (
    <div id="archives" className="relative z-20 bg-transparent px-6 py-24 border-t border-white/5">
      <div className="relative z-10 mx-auto max-w-7xl text-white">
        
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
                    {images.length} items
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
                    FOUND: {filteredImages.length} items
                  </p>
                </div>

                {/* Responsive Grid */}
                {filteredImages.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredImages.map((image, index) => (
                      <motion.article
                        key={image.src}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
                        className="group relative h-96 sm:h-[420px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-500 ease-out hover:scale-105 hover:z-30 hover:border-emerald-400/40 hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] cursor-pointer"
                        onClick={() => setLightboxIndex(index)}
                      >
                        <div className="relative h-full w-full overflow-hidden">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            quality={70}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 bg-neutral-950/20"
                          />
                          
                          {/* Premium Magnifier Overlay */}
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
                      const element = document.getElementById("archives");
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

      </div>

      {/* ========================================================================= */}
      {/* ARCHIVE LIGHTBOX MODAL                                                     */}
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
                Archive Poster {lightboxIndex + 1} of {filteredImages.length}
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
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
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
                {filteredImages[lightboxIndex].title}
              </h4>
              <p className="text-xs text-emerald-400 font-semibold tracking-widest mt-1 uppercase">
                {filteredImages[lightboxIndex].kind} DESIGN
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
