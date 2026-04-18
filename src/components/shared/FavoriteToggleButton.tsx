'use client';

import { FavoriteItem } from "@/types/favorite";
import { useFavoriteItem } from "@/hooks/useFavorites";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";

interface FavoriteToggleButtonProps {
  item: FavoriteItem;
  initialFavorite: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  hideUntilHover?: boolean;
}

const SIZE_STYLES = {
  sm: {
    button: "h-8 w-8 rounded-full",
    icon: "h-4 w-4",
  },
  md: {
    button: "h-10 w-10 rounded-full",
    icon: "h-5 w-5",
  },
  lg: {
    button: "h-12 w-12 rounded-full",
    icon: "h-6 w-6",
  },
};

export default function FavoriteToggleButton({
  item,
  initialFavorite,
  size = "md",
  className = "",
  hideUntilHover = false
}: FavoriteToggleButtonProps) {
  const { favorite, toggle } = useFavoriteItem(item, initialFavorite);

  const styles = SIZE_STYLES[size];

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`${favorite ? "Remove" : "Add"} ${item.title} ${favorite ? "from" : "to"} favorites`}
      className={[
        "flex items-center justify-center border transition-all duration-200 cursor-pointer",
        styles.button,
        favorite
          ? "border-cyan-400/90 bg-cyan-500/12 text-cyan-300 shadow-[0_0_0_1px_rgba(34,211,238,0.14),0_0_16px_rgba(34,211,238,0.08)]"
          : "border-white/10 bg-white/5 text-gray-400 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300",
          hideUntilHover && !favorite ? "opacity-0 group-hover:opacity-100" : "opacity-100",
        className,
      ].join(" ")}
    >
      {favorite ? (
        <HiHeart className={styles.icon} />
      ) : (
        <HiOutlineHeart className={styles.icon} />
      )}
    </button>
  );
}