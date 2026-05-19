import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Resume from "@/components/Resume";
import Gallery from "@/components/Gallery";
import UiUxProjects from "@/components/UiUxProjects";
import Footer from "@/components/Footer";
import SocialFeed from "@/components/SocialFeed";
import ShootingStars from "@/components/ShootingStars";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#121212] selection:bg-white/20">
      <div className="relative z-10">
        <ScrollyCanvas />
        <Overlay />
      </div>

      <div className="relative">
        <ShootingStars />
        <div className="relative z-10">
          <Resume />
          <SocialFeed />
          <UiUxProjects />
          <Gallery />
        </div>
      </div>
      <Footer />
    </main>
  );
}
