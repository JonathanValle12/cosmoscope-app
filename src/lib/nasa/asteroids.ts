import { NasaAsteroid, AsteroidCardData, AsteroidDayGroup, AsteroidsPageData, NeoFeedResponse } from "@/types/asteroid";

const API_KEY = process.env.NASA_API_KEY;
const LUNAR_DISTANCE_KM = 384400;

// =============================================
// Private helpers
// =============================================

export function getSizeLabel(
  diameterMeters: number
): "Small" | "Medium" | "Large" | "Massive" {
  if (diameterMeters < 50) return "Small";
  if (diameterMeters < 200) return "Medium";
  if (diameterMeters < 500) return "Large";
  return "Massive";
}

export function formatAsteroidDay(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// =============================================
// API
// =============================================

export async function fetchNeoFeed(startDate?: string, endDate?: string): Promise<NeoFeedResponse> {
    const today = new Date().toISOString().split("T")[0];
    const start = startDate || today;
    const end = endDate || today;

    try {
        const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${API_KEY}`,
            {
                next: { revalidate: 3600 },
            }
        );

        if (!res.ok) {
            console.warn("NEO Feed API failed");
            return { element_count: 0, near_earth_objects: {} }
        }

        return res.json();

    } catch (error) {
        console.warn("NEO feed error: ", error);
        return { element_count: 0, near_earth_objects: {} }
    }
}

// =============================================
// Mapper
// =============================================

export function mapNeoFeedToAsteroidsPageData(neoFeed: NeoFeedResponse): AsteroidsPageData {
    const entries: [string, NasaAsteroid[]][] = Object.entries(
        neoFeed.near_earth_objects
    ).sort(([dateA], [dateB]) => {
        return new Date(dateA).getTime() - new Date(dateB).getTime();
    });

    const days: AsteroidDayGroup[] = entries.map(([date, asteroids]) => {
        const mappedAsteroids: AsteroidCardData[] = asteroids
            .map((asteroid) => {
                const approach = asteroid.close_approach_data?.[0];
                const diameterMin = asteroid.estimated_diameter?.meters?.estimated_diameter_min ?? 0;
                const diameterMax = asteroid.estimated_diameter?.meters?.estimated_diameter_max ?? 0;

                const diameterMeters = (diameterMin + diameterMax) / 2;

                const velocityKmH = Number(
                    approach?.relative_velocity?.kilometers_per_hour ?? 0
                );

                const missDistanceKm = Number(
                    approach?.miss_distance?.kilometers ?? 0
                );

                const lunarDistance = missDistanceKm / LUNAR_DISTANCE_KM;

                return {
                    id: asteroid.id,
                    name: asteroid.name.replace(/[()]/g, ""),
                    nasaJplUrl: asteroid.nasa_jpl_url,
                    diameterMeters: Math.round(diameterMeters),
                    velocityKmH,
                    missDistanceKm,
                    lunarDistance,
                    hazardous: asteroid.is_potentially_hazardous_asteroid,
                    closestApproach: approach?.close_approach_date_full ?? date,
                    sizeLabel: getSizeLabel(diameterMeters),
                };
            })
            .sort((a, b) => {
                if (a.hazardous !== b.hazardous) {
                    return a.hazardous ? -1 : 1;
                }

                if (a.missDistanceKm !== b.missDistanceKm) {
                    return a.missDistanceKm - b.missDistanceKm;
                }

                if (a.diameterMeters !== b.diameterMeters) {
                    return b.diameterMeters - a.diameterMeters;
                }

                return a.name.localeCompare(b.name, "en", { numeric: true });
            });

        return {
            date,
            formattedDate: formatAsteroidDay(date),
            count: mappedAsteroids.length,
            asteroids: mappedAsteroids,
        };
    });

    const allAsteroids = days.flatMap((day) => day.asteroids);

    return {
        stats: {
            totalThisWeek: allAsteroids.length,
            hazardousCount: allAsteroids.filter((a) => a.hazardous).length,
            maxVelocityKmH: Math.max(...allAsteroids.map((a) => a.velocityKmH), 0),
            trackingPeriodDays: days.length,
        },
        days,
    };
}

// =============================================
// Page data
// =============================================

export async function getAsteroidsPageData(): Promise<AsteroidsPageData> {
    const today = new Date();
    const startDate = today.toISOString().split("T")[0];

    const endDateObj = new Date(today);
    endDateObj.setDate(endDateObj.getDate() + 6);
    const endDate = endDateObj.toISOString().split("T")[0];

    const neoFeed = await fetchNeoFeed(startDate, endDate);
    return mapNeoFeedToAsteroidsPageData(neoFeed);
}