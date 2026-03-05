import fs from "fs";
import path from "path";
import GalleryClient from "./GalleryClient";

export default async function Gallery() {
    const workDir = path.join(process.cwd(), "public/work");

    let files: string[] = [];
    try {
        const dirFiles = await fs.promises.readdir(workDir);
        // Filter for images
        files = dirFiles.filter(file =>
            file.toLowerCase().endsWith(".png") ||
            file.toLowerCase().endsWith(".jpg") ||
            file.toLowerCase().endsWith(".jpeg") ||
            file.toLowerCase().endsWith(".webp")
        );
    } catch (error) {
        console.error("Failed to read work directory:", error);
    }

    // Shuffle the array to make it look organic
    const shuffledImages = files.sort(() => 0.5 - Math.random());

    return <GalleryClient images={shuffledImages} />;
}
