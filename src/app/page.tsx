import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Resume from "@/components/Resume";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#121212] selection:bg-white/20">
      <div className="relative">
        <ScrollyCanvas />
        <Overlay />
      </div>
      <Resume />
      <Gallery />
    </main>
  );
}
