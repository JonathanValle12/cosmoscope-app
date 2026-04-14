import EarthPageContent from "@/components/earth/EarthPageContent";
import { getEarthPageData } from "@/lib/nasa/earth";

export default async function Earth() {

    const images = await getEarthPageData();

    return <EarthPageContent images={images} />
}