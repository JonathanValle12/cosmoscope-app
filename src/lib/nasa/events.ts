import { EventAccentColor, EventCardData, EventCategorySectionData, EventsPageData, EventStats, NaturalEvent } from "@/types/event";

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

function formatEventDate(value: string) {
    return new Date(value).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    })
}

function getPrimaryCategory(event: NaturalEvent) {
    return event.categories[0]?.title ?? "Other";
}

function getAccentColor(category: string): EventAccentColor {
    const normalized = category.toLowerCase();

    if (normalized.includes("wildfire")) return "orange";
    if (normalized.includes("storm")) return "purple";
    if (normalized.includes("ice")) return "cyan";
    if (normalized.includes("volcan")) return "red";

    return "blue";
}

function getSectionTitle(category: string) {
    const normalized = category.toLowerCase();

    if (normalized.includes("wildfire")) return "Wildfires";
    if (normalized.includes("storm")) return "Severe Storms";
    if (normalized.includes("ice")) return "Sea & Lake Ice";
    if (normalized.includes("volcan")) return "Volcanic Activity";

    return category;
}

function getEventCoordinates(event: NaturalEvent) {
    const latestGeometry = event.geometry[event.geometry.length - 1];

    if(!latestGeometry?.coordinates?.length) {
        return { latitude: 0, longitude: 0};
    }

    const [longitude, latitude] = latestGeometry.coordinates;

    return {
        latitude: Number(latitude ?? 0),
        longitude: Number(longitude ?? 0)
    };
}

function mapEventToCardData(event: NaturalEvent): EventCardData {
    const category = getPrimaryCategory(event);
    const accentColor = getAccentColor(category);
    const latestGeometry = event.geometry[event.geometry.length - 1];
    const { latitude, longitude } = getEventCoordinates(event);

    return {
        id: event.id,
        title: event.title,
        category: getSectionTitle(category),
        accentColor,
        formattedDate: formatEventDate(latestGeometry?.date ?? new Date().toISOString()),
        latitude,
        longitude,
        sourceUrl: event.sources[0]?.url,
        locationLabel: event.description ?? undefined
    };
}

function groupEvents(events: NaturalEvent[]): EventCategorySectionData[] {
    const groupedMap = new Map<string, EventCardData[]>();

    for (const event of events) {
        const category = getSectionTitle(getPrimaryCategory(event));
        const existing = groupedMap.get(category) ?? [];
        existing.push(mapEventToCardData(event));
        groupedMap.set(category, existing);
    }

    const priorityorder = [
        "Wildfires",
        "Volcanic Activity",
        "Severe Storms",
        "Sea & Lake Ice"
    ];

    return Array.from(groupedMap.entries())
        .map(([title, groupedEvents]) => ({
            key: title.toLowerCase().replace(/\s+/g, "-"),
            title,
            count: groupedEvents.length,
            accentColor: groupedEvents[0]?.accentColor ?? "blue",
            events: groupedEvents.sort((a, b) => {
                return (
                    new Date(b.formattedDate).getTime() - new Date(a.formattedDate).getTime()
                );
            }),
        }))
        .sort((a, b) => {
            const indexA = priorityorder.indexOf(a.title);
            const indexB = priorityorder.indexOf(b.title);

            if (indexA === -1 && indexB === -1 ) return a.title.localeCompare(b.title);
            if (indexA === -1 ) return -1;
            if (indexB === -1) return -1;

            return indexA - indexB;
        });
}

function buildStats(events: NaturalEvent[]): EventStats {
    const categories = events.map((event) => getSectionTitle(getPrimaryCategory(event)));

    return {
        totalEvents: events.length,
        wildfireCount: categories.filter((category) => category === "Wildfires").length,
        volcanicCount: categories.filter((category) => category === "Volcanic Activity").length,
        stormCount: categories.filter((category) => category === "Severe Storms").length,
    }
}

export async function getEventsPageData(): Promise<EventsPageData> {
    const response = await fetchNaturalEvents(100, 30);
    const events = response.events ?? [];

    return {
        stats: buildStats(events),
        sections: groupEvents(events)
    }
}