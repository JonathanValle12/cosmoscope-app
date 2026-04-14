import { NaturalEvent } from "@/types/event";

export async function fetchNaturalEvents(limit?: number, days?: number): Promise<{ events: NaturalEvent[] }> {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (days) params.append('days', days.toString());
    params.append('status', "open");

    try {
        const res = await fetch(`https://eonet.gsfc.nasa.gov/api/v3/events?${params.toString()}`, {
            next: { revalidate: 1800 }
        })
        if (!res.ok) {
            console.warn("EONET API failed");
            return { events: [] };
        }

        return res.json();
    } catch (error) {
        console.warn("EONET fetch error", error);
        return { events: [] };
    }
}
