'use client';

import { getFavorites, isFavorite, saveFavorites, toggleFavorites } from "@/lib/favorites";
import { FavoriteItem } from "@/types/favorite";
import { useState, useEffect } from "react";

export function useFavoriteItem(item: FavoriteItem, initialFavorite: boolean) {
  const [favorite, setFavorite] = useState(initialFavorite);

  useEffect(() => {
    // Verifica el estado real en localStorage tras el primer render
    const real = isFavorite(item.id, item.type);
    if (real !== favorite) {
      setFavorite(real);
      // Si localStorage no tiene el item, limpia también la cookie
      if (!real) {
        saveFavorites(getFavorites());
      }
    }
  }, []);

  function toggle() {
    const updatedFavorites = toggleFavorites(item);
    const exists = updatedFavorites.some(
      (f) => f.id === item.id && f.type === item.type
    );
    setFavorite(exists);
  }

  return { favorite, toggle };
}