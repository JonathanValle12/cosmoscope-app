
export interface NaturalEventCategory {
    id: string;
    title: string;
}

export interface NaturalEventSource {
    id: string;
    url: string;
}

export interface NaturalEventGeometry {
    date: string;
    type: string;
    coordinates: number[];
}

export interface NaturalEvent {
    id: string;
    title: string;
    description: string | null;
    link: string;
    categories: NaturalEventCategory[],
    sources: NaturalEventSource[],
    geometry: NaturalEventGeometry[]
}

export interface NaturalEventsResponse {
    events: NaturalEvent[];
}

export type EventAccentColor = "orange" | "purple" | "cyan" | "red" | "blue";

export interface EventCardData {
    id: string;
    title: string;
    category: string;
    accentColor: EventAccentColor;
    formattedDate: string;
    latitude: number;
    longitude: number;
    sourceUrl?: string;
    locationLabel?: string;
}

export interface EventCategorySectionData {
    key: string;
    title: string;
    count: number;
    events: EventCardData[];
}

export interface EventStats {
    totalEvents: number;
    wildfireCount: number;
    volcanicCount: number;
    stormCount: number;
}

export interface EventsPageData {
    stats: EventStats,
    sections: EventCategorySectionData[];
}