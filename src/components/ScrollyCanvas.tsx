"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 120;

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Store images in a ref to avoid recreating the array on every render
    const preloadedImages = useRef<HTMLImageElement[]>([]);

    // Scroll mapping
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        if (preloadedImages.current.length === FRAME_COUNT) {
            setImagesLoaded(true);
            return;
        }

        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            // Filename format: frame_000_delay-0.066s.png
            const indexStr = i.toString().padStart(3, "0");
            img.src = `/sequence/frame_${indexStr}_delay-0.066s.png`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setImagesLoaded(true);
                }
            };
            images.push(img);
        }

        preloadedImages.current = images;
    }, []);

    const drawImage = (index: number) => {
        if (!canvasRef.current || preloadedImages.current.length === 0) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = preloadedImages.current[index];
        if (!img) return;

        // Ensure canvas dimensions match logical dimensions for retina clarity
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (canvas.width !== viewportWidth || canvas.height !== viewportHeight) {
            canvas.width = viewportWidth;
            canvas.height = viewportHeight;
        }

        // Object-fit: cover logic
        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = canvas.height * imgRatio;
            drawHeight = canvas.height;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Initial draw once loaded
    useEffect(() => {
        if (imagesLoaded) {
            drawImage(Math.round(frameIndex.get()));
        }
    }, [imagesLoaded]);

    // Draw on resize
    useEffect(() => {
        const handleResize = () => {
            if (imagesLoaded) {
                drawImage(Math.round(frameIndex.get()));
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [imagesLoaded]);

    // Draw on scroll value change
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (imagesLoaded) {
            drawImage(Math.round(latest));
        }
    });

    return (
        <div ref={containerRef} className="relative h-[500vh] bg-[#121212] w-full">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full block"
                />
            </div>
        </div>
    );
}
