import { fetchNeoFeed } from "./asteroids";
import { fetchEPICImages } from "./earth";
import { fetchNaturalEvents } from "./events";

export interface QuickStatsData {
    asteroidCount: number;
    eventCount: number;
    earthDate: string;
    imageCount: number;
}

export async function getQuickStatsData(): Promise<QuickStatsData> {

    const [neoFeed, events, epicImages] = await Promise.all([
        fetchNeoFeed(),
        fetchNaturalEvents(50, 30),
        fetchEPICImages()
    ]);

    const today = new Date().toISOString().split('T')[0];
    const asteroidCount = neoFeed.near_earth_objects[today]?.length || 0;
    const eventCount = events.events?.length || 0;
    const earthDate = epicImages[0]?.date ? new Date(epicImages[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "Latest";

    return {
        asteroidCount,
        eventCount,
        earthDate,
        imageCount: 500000
    }
}