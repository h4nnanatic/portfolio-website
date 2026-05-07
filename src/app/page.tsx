import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Resume from "@/components/Resume";
import Gallery from "@/components/Gallery";
import UiUxProjects from "@/components/UiUxProjects";
import Footer from "@/components/Footer";
import SocialFeed from "@/components/SocialFeed";
import StatsBox from "@/components/StatsBox";
import ReviewPopup from "@/components/ReviewPopup";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isInView } = { isInView: true }; // Fallback or use scroll logic

  return (
    <main className="relative min-h-screen bg-[#121212] selection:bg-white/20">
      <div className="relative">
        <ScrollyCanvas />
        <Overlay />
      </div>
      
      <div className="relative z-30 -mt-20 px-6 max-w-7xl mx-auto">
         <StatsBox />
      </div>

      <Resume />
      <SocialFeed />
      <UiUxProjects />
      <Gallery />
      <Footer />
      
      <ReviewPopup trigger={true} />
    </main>
  );
}
