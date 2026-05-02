"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Section 1: 0% to 15% visible, fading out until 20%
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    // Section 2: Fades in at 20%, peaks at 30%, fades out by 45%
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.45], [50, -50]);

    // Section 3: Fades in at 50%, peaks at 60%, stays until 80%, fades out by 90%
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.9], [50, -50]);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-8">

                {/* Section 1 */}
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-lg">
                        Hannan Rasool.<br />
                        <span className="text-gray-300">Digital Marketer & Designer.</span>
                    </h1>
                    <a
                        href="https://www.linkedin.com/in/hannan-rasool-7593a8379/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 px-6 py-3 bg-[#0a66c2] text-white rounded-full font-medium hover:bg-[#004182] transition-colors pointer-events-auto flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        LinkedIn
                    </a>
                </motion.div>

                {/* Section 2 */}
                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className="absolute inset-x-0 inset-y-0 flex items-center justify-start text-left px-8 md:px-24"
                >
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white w-full max-w-4xl drop-shadow-lg">
                        Video Editor, Graphic Designer, and Digital Marketer.
                    </h2>
                </motion.div>

                {/* Section 3 */}
                <motion.div
                    style={{ opacity: opacity3, y: y3 }}
                    className="absolute inset-x-0 inset-y-0 flex items-center justify-end text-right px-8 md:px-24"
                >
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white w-full max-w-4xl drop-shadow-lg">
                        Turning ideas into clear and attractive visuals.
                    </h2>
                </motion.div>

            </div>
        </div>
    );
}
