"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 120;

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Store images in a ref to avoid recreating the array on every render
    const preloadedImages = useRef<(HTMLImageElement | null)[]>([]);

    // Scroll mapping
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    const frameSrc = (index: number) => {
        const indexStr = index.toString().padStart(3, "0");
        return `/sequence/frame_${indexStr}_delay-0.066s.webp`;
    };

    const resolveRenderableFrame = useCallback((index: number) => {
        const frames = preloadedImages.current;
        const candidate = frames[index];
        if (candidate?.complete && candidate.naturalWidth > 0) {
            return candidate;
        }

        for (let i = index - 1; i >= 0; i--) {
            const frame = frames[i];
            if (frame?.complete && frame.naturalWidth > 0) {
                return frame;
            }
        }

        for (let i = index + 1; i < FRAME_COUNT; i++) {
            const frame = frames[i];
            if (frame?.complete && frame.naturalWidth > 0) {
                return frame;
            }
        }

        return null;
    }, []);

    const drawImage = useCallback((index: number) => {
        if (!canvasRef.current || preloadedImages.current.length === 0) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = resolveRenderableFrame(index);
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
    }, [resolveRenderableFrame]);

    useEffect(() => {
        let cancelled = false;
        const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
        preloadedImages.current = images;

        const firstFrame = new Image();
        firstFrame.decoding = "sync";
        firstFrame.src = frameSrc(0);
        images[0] = firstFrame;

        firstFrame.onload = () => {
            if (cancelled) return;
            setImagesLoaded(true);
            drawImage(Math.round(frameIndex.get()));
        };

        firstFrame.onerror = () => {
            if (cancelled) return;
            setImagesLoaded(true);
        };

        for (let i = 1; i < FRAME_COUNT; i++) {
            const frame = new Image();
            frame.decoding = "async";
            frame.src = frameSrc(i);
            images[i] = frame;
        }

        return () => {
            cancelled = true;
        };
    }, [drawImage, frameIndex]);

    // Initial draw once loaded
    useEffect(() => {
        if (imagesLoaded) {
            drawImage(Math.round(frameIndex.get()));
        }
    }, [drawImage, frameIndex, imagesLoaded]);

    // Draw on resize
    useEffect(() => {
        const handleResize = () => {
            if (imagesLoaded) {
                drawImage(Math.round(frameIndex.get()));
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [drawImage, frameIndex, imagesLoaded]);

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
