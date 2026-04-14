import { EarthImageItem, EPICImage } from "@/types/earth";

const API_KEY = process.env.NASA_API_KEY;

export async function fetchEPICImages(date?: string): Promise<EPICImage[]> {
    const dateParam = date ? `date/${date}` : "natural";

    try {
        const res = await fetch(
            `https://api.nasa.gov/EPIC/api/${dateParam}?api_key=${API_KEY}`,
            {
                next: { revalidate: 3600 },
            }
        );

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

function formatEpicDate(dateValue: string) {
  const normalized = dateValue.replace(" ", "T");

  return new Date(normalized).toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function getEpicImageUrl(image: EPICImage) {
    const [datePart] = image.date.split(" ");
    const [year, month, day] = datePart.split("-");

    return `https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/png/${image.image}.png?api_key=${API_KEY}`;
}
export async function getEarthPageData(): Promise<EarthImageItem[]> {
    const images = await fetchEPICImages();

    return images.map((image) => ({
        ...image,
        imageUrl: getEpicImageUrl(image),
        formattedDate: formatEpicDate(image.date),
    }));
}