import { FavoriteItem, FavoriteSectionData, FavoriteType } from "@/types/favorite";
import Cookies from "js-cookie";

const FAVORITES_KEY = "cosmoscope-favorites";
const FAVORITES_COOKIE_KEY = "cosmoscope-fav-ids";

export function getFavorites(): FavoriteItem[] {
    if (typeof window === "undefined") return [];

    try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function saveFavorites(items: FavoriteItem[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));

    const ids = items.map(f => `${f.id}__${f.type}`);
    Cookies.set(FAVORITES_COOKIE_KEY, JSON.stringify(ids), { expires: 365});
}

export function isFavorite(id: string, type: FavoriteType) {
    const favorites = getFavorites();
    return favorites.some((item) => item.id === id && item.type === type);
}

export function isFavoriteFromCookie(id: string, type: FavoriteType, cookieValue: string): boolean {
    try {
        const ids: string[] = JSON.parse(cookieValue);
        return ids.includes(`${id}__${type}`);
    } catch {
        return false;
    }
}

export function addFavorite(item: FavoriteItem) {
    const favorites = getFavorites();

    const exists = favorites.some((favorite) => favorite.id === item.id && favorite.type === item.type);
    
    if (exists) return favorites;

    const updated = [...favorites, item];
    saveFavorites(updated);
    return updated;
}

export function removeFavorite(id: string, type: FavoriteType) {
    const favorites = getFavorites();

    const updated = favorites.filter((item) => !(item.id === id && item.type === type));

    saveFavorites(updated);
    return updated;
}

export function toggleFavorites(item: FavoriteItem) {
    if (isFavorite(item.id, item.type)) {
        return removeFavorite(item.id, item.type);
    }

    return addFavorite(item);
}

export function groupFavorites(items: FavoriteItem[]): FavoriteSectionData[] {
    const images = items.filter((item) => item.type === "image");
    const asteroids = items.filter((item) => item.type === "asteroid");
    const events = items.filter((item) => item.type === "event");

    return [
        { key: "images", title: "Images & Media", items: images},
        { key: "asteroids", title: "Asteroids", items: asteroids},
        { key: "events", title: "Natural Events", items: events},
    ].filter((section) => section.items.length > 0);
}