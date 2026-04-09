import { EPICImage } from "@/types/earth";

const API_KEY = process.env.NASA_API_KEY;

export async function fetchEPICImages(date?: string): Promise<EPICImage[]> {
    const dateParam = date ? `date/${date}` : "natural";

    try {
        const res = await fetch(`https://api.nasa.gov/EPIC/api/${dateParam}?api_key=${API_KEY}`, {
            next: { revalidate: 3600 },
        });


        if (!res.ok) {
            console.warn("EPIC API failed");
            return [];
        }

        return res.json();
    } catch (error) {
        console.warn("EPIC error:", error);
        return [];
    }
}