'use client';

import { useEffect, useState } from "react"
import FavoriteHero from "./FavoriteHero"
import { FavoriteItem } from "@/types/favorite"
import { groupFavorites, removeFavorite } from "@/lib/favorites";
import FavoriteEmptyState from "./FavoriteEmptyState";
import FavoriteSection from "./FavoriteSection";

export default function FavoritePageContent() {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {

        try {
            const stored = localStorage.getItem("cosmoscope-favorites");
            setFavorites(stored ? JSON.parse(stored) : []);
        } catch {
            setFavorites([]);
        } finally {
            setIsReady(true);
        }
    }, []);

    function handleRemove(id: string, type: FavoriteItem["type"]) {
        const updated = removeFavorite(id, type);
        setFavorites(updated);
    }

    const sections = groupFavorites(favorites);

    return (
        <section className="min-h-screen" aria-labelledby="explorer-title">
            <FavoriteHero />

            {!isReady ? null : favorites.length === 0 ? (
                <FavoriteEmptyState />
            ) : (
                <div className="mt-10 space-y-10">
                    {sections.map((section) => (
                        <FavoriteSection key={section.key} section={section} onRemove={handleRemove} />
                    ))}
                </div>
            )}
        </section>
    )
}