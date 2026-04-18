import { EarthImageItem } from "@/types/earth"
import EarthHero from "./EarthHero";
import EarthInfoBanner from "./EarthInfoBanner";
import EarthGallery from "./EarthGallery";

interface EarthPageContentProps {
    images: EarthImageItem[];
    favCookie: string;
}

export default function EarthPageContent({ images, favCookie }: EarthPageContentProps) {
    return (
        <section className="min-h-screen" aria-labelledby="explorer-title">
            <EarthHero />
            <EarthInfoBanner />
            <EarthGallery images={images} favCookie={favCookie} />
        </section>
    )
}