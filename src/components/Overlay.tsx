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
                    className="absolute inset-0 flex items-center justify-center text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-lg">
                        Hannan Rasool.<br />
                        <span className="text-gray-300">Digital Marketer & Designer.</span>
                    </h1>
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
