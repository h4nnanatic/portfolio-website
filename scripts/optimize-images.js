const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const WORK_DIR = path.join(process.cwd(), 'public', 'work');
const THUMB_DIR = path.join(process.cwd(), 'public', 'thumbnails');
const SEQ_DIR = path.join(process.cwd(), 'public', 'sequence');

// New untracked folders
const NEW_THUMB_DIR = path.join(process.cwd(), 'THUMBNAIL');
const NEW_POSTERS_DIR = path.join(process.cwd(), 'Posters');

// Helper to check if file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Function to optimize an image
async function optimizeImage(srcPath, destPath, options = {}) {
  const { maxWidthOrHeight = 1600, quality = 80 } = options;
  console.log(`Optimizing: ${path.basename(srcPath)} -> ${path.basename(destPath)}`);

  try {
    let pipeline = sharp(srcPath);

    // Get metadata to see dimensions
    const metadata = await pipeline.metadata();
    const width = metadata.width || 0;
    const height = metadata.height || 0;

    // Only resize if it exceeds max dimension
    if (width > maxWidthOrHeight || height > maxWidthOrHeight) {
      pipeline = pipeline.resize({
        width: width > height ? maxWidthOrHeight : undefined,
        height: height >= width ? maxWidthOrHeight : undefined,
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Convert to webp
    await pipeline
      .webp({ quality })
      .toFile(destPath);
    
    return true;
  } catch (err) {
    console.error(`Failed to optimize ${srcPath}:`, err);
    return false;
  }
}

async function run() {
  console.log('--- Starting Image Optimization ---');

  // 1. Convert existing thumbnails to webp
  console.log('\nOptimizing existing thumbnails in public/thumbnails...');
  const thumbFiles = await fs.readdir(THUMB_DIR);
  for (const file of thumbFiles) {
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const ext = path.extname(file);
      const base = path.basename(file, ext);
      const srcPath = path.join(THUMB_DIR, file);
      const destPath = path.join(THUMB_DIR, `${base}.webp`);

      const success = await optimizeImage(srcPath, destPath, { maxWidthOrHeight: 1200, quality: 75 });
      if (success && ext.toLowerCase() !== '.webp') {
        await fs.unlink(srcPath);
        console.log(`Deleted original: ${file}`);
      }
    }
  }

  // 2. Convert existing work posters to webp (skipping pdf)
  console.log('\nOptimizing existing posters in public/work...');
  const workFiles = await fs.readdir(WORK_DIR);
  for (const file of workFiles) {
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const ext = path.extname(file);
      const base = path.basename(file, ext);
      const srcPath = path.join(WORK_DIR, file);
      const destPath = path.join(WORK_DIR, `${base}.webp`);

      const success = await optimizeImage(srcPath, destPath, { maxWidthOrHeight: 1600, quality: 80 });
      if (success && ext.toLowerCase() !== '.webp') {
        await fs.unlink(srcPath);
        console.log(`Deleted original: ${file}`);
      }
    }
  }

  // 3. Convert scroll sequence frames to webp (upscaling to Full HD 1920x1080)
  console.log('\nOptimizing scrolling sequence frames in public/sequence (upscaling to Full HD)...');
  const seqFiles = await fs.readdir(SEQ_DIR);
  for (const file of seqFiles) {
    if (file.match(/\.(png|jpg|jpeg)$/i) && !file.endsWith('.webp')) {
      const ext = path.extname(file);
      const base = path.basename(file, ext);
      const srcPath = path.join(SEQ_DIR, file);
      const destPath = path.join(SEQ_DIR, `${base}.webp`);

      try {
        await sharp(srcPath)
          .resize(1920, 1080, { fit: 'fill' })
          .webp({ quality: 80 })
          .toFile(destPath);
        
        await fs.unlink(srcPath);
      } catch (err) {
        console.error(`Failed to upscale ${file}:`, err);
      }
    }
  }

  // 4. Import & compress the 6 new thumbnails
  console.log('\nImporting new thumbnails from THUMBNAIL/ root directory...');
  const newThumbs = [
    'ChatGPT Image Jun 3, 2026, 04_47_45 PM.png',
    'ChatGPT Image Jun 3, 2026, 04_49_59 PM.png',
    'ChatGPT Image Jun 3, 2026, 04_50_06 PM.png',
    'ChatGPT Image Jun 3, 2026, 04_50_47 PM.png',
    'ChatGPT Image Jun 3, 2026, 04_55_44 PM.png',
    'ChatGPT Image Jun 3, 2026, 04_58_44 PM.png'
  ];

  for (let i = 0; i < newThumbs.length; i++) {
    const fileName = newThumbs[i];
    const srcPath = path.join(NEW_THUMB_DIR, fileName);
    const index = 31 + i; // next after 30
    const destPath = path.join(THUMB_DIR, `${index}.webp`);

    if (await fileExists(srcPath)) {
      await optimizeImage(srcPath, destPath, { maxWidthOrHeight: 1200, quality: 75 });
    } else {
      console.warn(`File not found: ${srcPath}`);
    }
  }

  // 5. Import & compress the 4 new posters
  console.log('\nImporting new posters from Posters/ root directory...');
  const newPosters = [
    'ChatGPT Image Jun 3, 2026, 03_35_34 PM.png',
    'ChatGPT Image Jun 3, 2026, 04_38_18 PM.png',
    'ChatGPT Image Jun 3, 2026, 04_47_49 PM.png',
    'ChatGPT Image Jun 3, 2026, 12_30_23 AM.png'
  ];

  for (const fileName of newPosters) {
    const srcPath = path.join(NEW_POSTERS_DIR, fileName);
    const ext = path.extname(fileName);
    const base = path.basename(fileName, ext);
    const destPath = path.join(WORK_DIR, `${base}.webp`);

    if (await fileExists(srcPath)) {
      await optimizeImage(srcPath, destPath, { maxWidthOrHeight: 1600, quality: 80 });
    } else {
      console.warn(`File not found: ${srcPath}`);
    }
  }

  // 6. Import & compress the 7 new thumbnails (Jun 8)
  console.log('\nImporting new thumbnails (Jun 8) from THUMBNAIL/ root directory...');
  const newThumbsJun8 = [
    'ChatGPT Image Jun 8, 2026, 07_16_42 PM.png',
    'ChatGPT Image Jun 8, 2026, 07_16_57 PM.png',
    'ChatGPT Image Jun 8, 2026, 07_16_59 PM.png',
    'ChatGPT Image Jun 8, 2026, 07_17_08 PM.png',
    'ChatGPT Image Jun 8, 2026, 07_17_11 PM.png',
    'ChatGPT Image Jun 8, 2026, 07_17_17 PM.png',
    'ChatGPT Image Jun 8, 2026, 07_48_29 PM.png'
  ];

  for (let i = 0; i < newThumbsJun8.length; i++) {
    const fileName = newThumbsJun8[i];
    const srcPath = path.join(NEW_THUMB_DIR, fileName);
    const index = 37 + i; // next after 36
    const destPath = path.join(THUMB_DIR, `${index}.webp`);

    if (await fileExists(srcPath)) {
      await optimizeImage(srcPath, destPath, { maxWidthOrHeight: 1200, quality: 75 });
    } else {
      console.warn(`File not found: ${srcPath}`);
    }
  }

  // 7. Import & compress the 5 new posters (Jun 8) and rename them
  console.log('\nImporting new posters (Jun 8) from Posters/ root directory...');
  const newPostersJun8 = [
    { original: 'ChatGPT Image Jun 8, 2026, 07_25_11 PM.png', renamed: 'Stop Trying To Control Everything.webp' },
    { original: 'ChatGPT Image Jun 8, 2026, 07_27_30 PM.png', renamed: 'Sometimes All You Need Is You.webp' },
    { original: 'ChatGPT Image Jun 8, 2026, 07_37_20 PM.png', renamed: 'The Boy Billy Butcher.webp' },
    { original: 'ChatGPT Image Jun 8, 2026, 07_39_50 PM.png', renamed: 'Original Mindset.webp' },
    { original: 'ChatGPT Image Jun 8, 2026, 07_46_11 PM.png', renamed: 'Dont Be Introverted.webp' }
  ];

  for (const item of newPostersJun8) {
    const srcPath = path.join(NEW_POSTERS_DIR, item.original);
    const destPath = path.join(THUMB_DIR, item.renamed);

    if (await fileExists(srcPath)) {
      await optimizeImage(srcPath, destPath, { maxWidthOrHeight: 1600, quality: 80 });
    } else {
      console.warn(`File not found: ${srcPath}`);
    }
  }

  console.log('\n--- Image Optimization Completed Successfully ---');
}

run().catch(err => {
  console.error('Error in optimization script:', err);
  process.exit(1);
});
