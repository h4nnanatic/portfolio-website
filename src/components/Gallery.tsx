import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { imageSize } from "image-size";
import GalleryClient from "./GalleryClient";
import { POSTERS } from "@/lib/constants";

const WORK_DIR = path.join(process.cwd(), "public", "work");
const FALLBACK_WIDTH = 1200;
const FALLBACK_HEIGHT = 1600;

const GENERIC_NAME_PATTERNS = [
  /^untitled/i,
  /^frame\s+\d+/i,
  /^gemini_generated_image/i,
];

function stripExtension(value: string) {
  return value.replace(/\.[^/.]+$/, "");
}

function getPosterBucket(fileName: string) {
  const baseName = stripExtension(fileName).toLowerCase().trim();

  if (GENERIC_NAME_PATTERNS.some((pattern) => pattern.test(baseName))) {
    return 2;
  }

  if (/^\d+(\s*\(\d+\))?$/.test(baseName)) {
    return 1;
  }

  return 0;
}

function getNumericSortMeta(fileName: string) {
  const baseName = stripExtension(fileName).trim();
  const match = baseName.match(/^(\d+)(?:\s*\((\d+)\))?$/);
  if (!match) {
    return null;
  }

  return {
    number: Number(match[1]),
    duplicateIndex: match[2] ? Number(match[2]) : 0,
  };
}

const orderedPosters = [...POSTERS].sort((a, b) => {
  const bucketA = getPosterBucket(a);
  const bucketB = getPosterBucket(b);
  if (bucketA !== bucketB) {
    return bucketA - bucketB;
  }

  if (bucketA === 1) {
    const metaA = getNumericSortMeta(a);
    const metaB = getNumericSortMeta(b);
    if (metaA && metaB) {
      if (metaA.number !== metaB.number) {
        return metaA.number - metaB.number;
      }
      return metaA.duplicateIndex - metaB.duplicateIndex;
    }
  }

  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
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
