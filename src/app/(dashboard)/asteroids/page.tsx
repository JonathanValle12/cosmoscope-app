import AsteroidPageContent from "@/components/asteroids/AsteroidPageContent";
import { getAsteroidsPageData } from "@/lib/nasa/asteroids";

export default async function Asteroids() {
    const data = await getAsteroidsPageData();

    return <AsteroidPageContent data={data} />
}