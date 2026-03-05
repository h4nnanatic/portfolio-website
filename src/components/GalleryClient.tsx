"use client";

import React from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";
// Next Image is generally better, but for a masonry layout of arbitrary dynamic images from fs, standard <img> or Next Image with unoptimized flags can work.
// Standard `<img />` works flawlessly with generic masonry CSS widths.

interface GalleryClientProps {
    images: string[];
}

export default function GalleryClient({ images }: GalleryClientProps) {
    return (
        <div className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-6">

            {/* Decorative gradient orb */}
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto text-white relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 flex items-center gap-4"
                >
                    <ImageIcon className="w-8 h-8 text-neutral-400" />
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Selected Works
                    </h2>
                </motion.div>

                {/* Masonry Grid Layout using pure CSS columns for an aesthetic masonry effect */}
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: (i % 6) * 0.1 }}
                            className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10"
                        >
                            {/* Image */}
                            <img
                                src={`/work/${img}`}
                                alt={`Poster artwork ${i + 1}`}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                <p className="text-sm font-medium tracking-widest uppercase text-white/90 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    Creative Design
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
