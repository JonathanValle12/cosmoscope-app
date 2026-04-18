export type FavoriteType = "image" | "asteroid" | "event";

export interface FavoriteItem {
    id: string;
    type: FavoriteType;
    title: string;
    description?: string;
    date?: string;
    imageUrl?: string;
    href?: string;
}

export interface FavoriteSectionData {
    key: string;
    title: string;
    items: FavoriteItem[];
}