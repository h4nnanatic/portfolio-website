import GalleryClient from "./GalleryClient";
import { POSTERS } from "@/lib/constants";

export default function Gallery() {
    // Shuffle the array to make it look organic
    const shuffledImages = [...POSTERS].sort(() => 0.5 - Math.random());

    return <GalleryClient images={shuffledImages} />;
}
