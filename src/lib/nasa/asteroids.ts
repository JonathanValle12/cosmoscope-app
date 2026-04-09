import { Asteroid } from "@/types/asteroid";

const API_KEY = process.env.NASA_API_KEY;

export interface NeoFeed {
    element_count: number,
    near_earth_objects: {
        [date: string]: Asteroid[]
    }
}
export async function fetchNeoFeed(startDate?: string, endDate?: string): Promise<NeoFeed> {
    const today = new Date().toISOString().split("T")[0];
    const start = startDate || today;
    const end = endDate || today;
    
    try {
        const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${API_KEY}`,
        {
            next: { revalidate: 3600},
        }
    );

    if(!res.ok) {
        console.warn("NEO Feed API failed");
        return { element_count: 0, near_earth_objects: {} }
    }

    return res.json();

    } catch (error) {
        console.warn("NEO feed error: ", error);
        return { element_count: 0, near_earth_objects: {}}
    }
}