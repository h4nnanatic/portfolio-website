import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { imageSize } from "image-size";
import GalleryClient from "./GalleryClient";
import { POSTERS } from "@/lib/constants";

const WORK_DIR = path.join(process.cwd(), "public", "work");
const FALLBACK_WIDTH = 1200;
const FALLBACK_HEIGHT = 1600;

const FEATURED_WORKS = [
  "jvolabs.png",
  "Sports Fest Intramurals Banner in Blue and Neon Green Illustrative Style(1).png",
  "National University of Modern Languages (Faisalabad Campus) INDOOR SPORTS FEST.png",
  "CXO MEETUP.jpg",
  "annual dinner.png",
  "sports fest.png",
  "_sarautomation.png",
  "sarzone automation.png",
  "httpsportals.numl.edu.pk AdmissionPortalLogin.png",
  "Beige and Black Minimalist Fashion Store Logo.png"
];

const TITLE_OVERRIDES: Record<string, string> = {
  "httpsportals.numl.edu.pk AdmissionPortalLogin.png": "Admission Portal Campaign Creative",
  "_sarautomation.png": "SAR Automation Campaign",
  "sarzone automation.png": "SAR Zone Automation Design",
};

const GENERIC_NAME_PATTERNS = [/^untitled/i, /^frame\s+\d+/i, /^gemini_generated_image/i];

type WorkKind = "poster" | "banner" | "branding";

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  fileName: string;
  title: string;
  kind: WorkKind;
  featured: boolean;
  featuredOrder: number;
}

function stripExtension(value: string) {
  return value.replace(/\.[^/.]+$/, "");
}

function prettifyTitle(fileName: string) {
  const override = TITLE_OVERRIDES[fileName];
  if (override) {
    return override;
  }

  return stripExtension(fileName)
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function classifyWork(fileName: string, width: number, height: number): WorkKind {
  const baseName = stripExtension(fileName).toLowerCase();
  const ratio = width / height;

  if (
    ratio >= 1.6 ||
    /banner|meetup|sports fest|jvolabs|annual dinner|cxo/i.test(baseName)
  ) {
    return "banner";
  }

  if (/logo|automation|identity|brand/i.test(baseName)) {
    return "branding";
  }

  return "poster";
}

function numericMeta(fileName: string) {
  const match = stripExtension(fileName).trim().match(/^(\d+)(?:\s*\((\d+)\))?$/);
  if (!match) {
    return null;
  }

  return {
    value: Number(match[1]),
    duplicate: match[2] ? Number(match[2]) : 0,
  };
}

function sortKeyForFile(fileName: string) {
  const baseName = stripExtension(fileName).toLowerCase().trim();
  const numeric = numericMeta(fileName);

  if (numeric) {
    return {
      bucket: 0,
      numericValue: numeric.value,
      duplicateValue: numeric.duplicate,
      text: "",
    };
  }

  if (GENERIC_NAME_PATTERNS.some((pattern) => pattern.test(baseName))) {
    return {
      bucket: 2,
      numericValue: Number.MAX_SAFE_INTEGER,
      duplicateValue: Number.MAX_SAFE_INTEGER,
      text: baseName,
    };
  }

  return {
    bucket: 1,
    numericValue: Number.MAX_SAFE_INTEGER,
    duplicateValue: Number.MAX_SAFE_INTEGER,
    text: baseName,
  };
}

function compareForGallery(a: GalleryImage, b: GalleryImage) {
  const featuredDiff = a.featuredOrder - b.featuredOrder;
  if (featuredDiff !== 0) {
    return featuredDiff;
  }

  const kindOrder: Record<WorkKind, number> = {
    poster: 0,
    banner: 1,
    branding: 2,
  };
  const kindDiff = kindOrder[a.kind] - kindOrder[b.kind];
  if (kindDiff !== 0) {
    return kindDiff;
  }

  const keyA = sortKeyForFile(a.fileName);
  const keyB = sortKeyForFile(b.fileName);

  if (keyA.bucket !== keyB.bucket) {
    return keyA.bucket - keyB.bucket;
  }

  if (keyA.numericValue !== keyB.numericValue) {
    return keyA.numericValue - keyB.numericValue;
  }

  if (keyA.duplicateValue !== keyB.duplicateValue) {
    return keyA.duplicateValue - keyB.duplicateValue;
  }

  return keyA.text.localeCompare(keyB.text, undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

const getGalleryImages = cache(async () => {
  const images = await Promise.all(
    POSTERS.map(async (fileName, index) => {
      const filePath = path.join(WORK_DIR, fileName);
      const encodedName = encodeURIComponent(fileName);

      let width = FALLBACK_WIDTH;
      let height = FALLBACK_HEIGHT;

      try {
        const fileBuffer = await fs.readFile(filePath);
        const dimensions = imageSize(fileBuffer);
        width = dimensions.width ?? FALLBACK_WIDTH;
        height = dimensions.height ?? FALLBACK_HEIGHT;
      } catch {
        // fall back to default dimensions if a file can't be read
      }

      const featuredOrder = FEATURED_WORKS.indexOf(fileName);

      return {
        src: `/work/${encodedName}`,
        alt: `Poster artwork ${index + 1}`,
        width,
        height,
        fileName,
        title: prettifyTitle(fileName),
        kind: classifyWork(fileName, width, height),
        featured: featuredOrder >= 0,
        featuredOrder: featuredOrder >= 0 ? featuredOrder : Number.MAX_SAFE_INTEGER,
      } satisfies GalleryImage;
    }),
  );

  return images.sort(compareForGallery);
});

export default async function Gallery() {
  const images = await getGalleryImages();
  return <GalleryClient images={images} />;
}
