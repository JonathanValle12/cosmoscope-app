import { NasaSearchResult } from "@/types/explorer";

export async function searchNASAImages(query: string, page = 1, mediaType = "image"): Promise<NasaSearchResult> {

    const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        media_type: mediaType,
    });

    try {
        const res = await fetch(`https://images-api.nasa.gov/search?${params.toString()}`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            console.warn("NASA Image API failed");
            return { collection: { items: [], metadata: { total_hits: 0 } } };
        }

        return res.json();
    } catch (error) {
        console.warn("NASA Images search error:", error)
        return { collection: { items: [], metadata: { total_hits: 0 } } }
    }
}