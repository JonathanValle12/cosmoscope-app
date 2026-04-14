import { EarthImageItem } from "@/types/earth"
import EarthHero from "./EarthHero";
import EarthInfoBanner from "./EarthInfoBanner";
import EarthGallery from "./EarthGallery";

interface EarthPageContentProps {
    images: EarthImageItem[];
}

export default function EarthPageContent({ images }: EarthPageContentProps) {
    return (
        <section className="min-h-screen" aria-labelledby="explorer-title">
            <EarthHero />
            <EarthInfoBanner />
            <EarthGallery images={images} />
        </section>
    )
}