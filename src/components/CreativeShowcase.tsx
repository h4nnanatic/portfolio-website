import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { imageSize } from "image-size";
import CreativeShowcaseClient from "./CreativeShowcaseClient";
import { ACTIVE_POSTERS } from "@/lib/constants";
import type { GalleryImage } from "./Gallery";

const THUMB_DIR = path.join(process.cwd(), "public", "thumbnails");
const FALLBACK_WIDTH = 1200;
const FALLBACK_HEIGHT = 1600;

function stripExtension(value: string) {
  return value.replace(/\.[^/.]+$/, "");
}

function prettifyTitle(fileName: string) {
  return stripExtension(fileName)
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function classifyWork(fileName: string, width: number, height: number) {
  const baseName = stripExtension(fileName).toLowerCase();
  const ratio = width / height;

  if (ratio >= 1.6 || /banner/i.test(baseName)) {
    return "banner" as const;
  }
  if (/logo|identity|brand/i.test(baseName)) {
    return "branding" as const;
  }
  return "poster" as const;
}

const getActiveImages = cache(async () => {
  return Promise.all(
    ACTIVE_POSTERS.map(async (fileName, index) => {
      const filePath = path.join(THUMB_DIR, fileName);
      const encodedName = encodeURIComponent(fileName);

      let width = FALLBACK_WIDTH;
      let height = FALLBACK_HEIGHT;

      try {
        const fileBuffer = await fs.readFile(filePath);
        const dimensions = imageSize(fileBuffer);
        width = dimensions.width ?? FALLBACK_WIDTH;
        height = dimensions.height ?? FALLBACK_HEIGHT;
      } catch {
        // fallback
      }

      return {
        src: `/thumbnails/${encodedName}`,
        alt: `Thumbnail ${index + 1}`,
        width,
        height,
        fileName,
        title: prettifyTitle(fileName),
        kind: classifyWork(fileName, width, height),
        featured: true,
        featuredOrder: index,
      } satisfies GalleryImage;
    })
  );
});

export default async function CreativeShowcase() {
  const images = await getActiveImages();
  return <CreativeShowcaseClient images={images} />;
}
