export interface NASAImage {
    data: {
        center: string;
        date_created: string;
        description: string;
        keywords?: string[];
        media_type: string;
        nasa_id: string;
        title: string;
    }[];
    links?: {
        href: string;
        rel: string;
        render?: string;
    }[];
}
export interface NasaSearchResult {
    collection: {
        items: NASAImage[];
        metadata: {
            total_hits: number
        }
    }
}