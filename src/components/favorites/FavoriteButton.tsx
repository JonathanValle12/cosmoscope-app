'use client'

import { useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";

export default function FavoriteButton() {
    const [ isFavorite, setIsFavorite] = useState(false);

    return (
        <button type="button" onClick={() => setIsFavorite(!isFavorite)} aria-label="Añadir a favoritos" className={`group flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200 ${isFavorite ? "border-cyan-400 text-cyan-400" : "border-white/15 text-white/90 hover:border-cyan-400 hover:text-cyan-400"} bg-[#050816]/80 backdrop-blur-sm`}>
            {isFavorite ? (
                <HiHeart className="h-5 w-5" />
            ) : (
                <HiOutlineHeart className="h-5 w-5" />
            )}
        </button>
    )
}