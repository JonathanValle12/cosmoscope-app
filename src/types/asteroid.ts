
export interface NasaAsteroid {
    id: string;
    name: string;
    nasa_jpl_url: string;
    is_potentially_hazardous_asteroid: boolean;
    estimated_diameter: {
        meters: {
            estimated_diameter_min: number;
            estimated_diameter_max: number;
        };
    };
    close_approach_data: {
        close_approach_date: string;
        close_approach_date_full?: string;
        relative_velocity: {
            kilometers_per_hour: string;
        };
        miss_distance: {
            kilometers: string;
        };
    }[];
}

export interface NeoFeedResponse {
    element_count: number;
    near_earth_objects: Record<string, NasaAsteroid[]>;
}

export interface AsteroidCardData {
    id: string;
    name: string;
    nasaJplUrl: string;
    diameterMeters: number;
    velocityKmH: number;
    missDistanceKm: number;
    lunarDistance: number;
    hazardous: boolean;
    closestApproach: string;
    sizeLabel: "Small" | "Medium" | "Large" | "Massive";
}

export interface AsteroidDayGroup {
    date: string;
    formattedDate: string;
    count: number;
    asteroids: AsteroidCardData[];
}

export interface AsteroidStats {
    totalThisWeek: number;
    hazardousCount: number;
    maxVelocityKmH: number;
    trackingPeriodDays: number;
}

export interface AsteroidsPageData {
    stats: AsteroidStats;
    days: AsteroidDayGroup[];
}