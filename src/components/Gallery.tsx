import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { imageSize } from "image-size";
import GalleryClient from "./GalleryClient";
import { POSTERS } from "@/lib/constants";

function stableWeight(value: string) {
  return [...value].reduce(
    (acc, ch) => (acc * 33 + ch.charCodeAt(0)) % 2147483647,
    7,
  );
}

const WORK_DIR = path.join(process.cwd(), "public", "work");
const FALLBACK_WIDTH = 1200;
const FALLBACK_HEIGHT = 1600;

const orderedPosters = [...POSTERS].sort((a, b) => {
    const weightDiff = stableWeight(a) - stableWeight(b);
    return weightDiff !== 0 ? weightDiff : a.localeCompare(b);
  });

const getGalleryImages = cache(async () => {
  const images = await Promise.all(
    orderedPosters.map(async (fileName, index) => {
      const filePath = path.join(WORK_DIR, fileName);
      const encodedName = encodeURIComponent(fileName);

      try {
        const fileBuffer = await fs.readFile(filePath);
        const dimensions = imageSize(fileBuffer);

        return {
          src: `/work/${encodedName}`,
          alt: `Poster artwork ${index + 1}`,
          width: dimensions.width ?? FALLBACK_WIDTH,
          height: dimensions.height ?? FALLBACK_HEIGHT,
        };
      } catch {
        return {
          src: `/work/${encodedName}`,
          alt: `Poster artwork ${index + 1}`,
          width: FALLBACK_WIDTH,
          height: FALLBACK_HEIGHT,
        };
      }
    }),
  );

  return images;
});

export default async function Gallery() {
  const images = await getGalleryImages();
  return <GalleryClient images={images} />;
}
