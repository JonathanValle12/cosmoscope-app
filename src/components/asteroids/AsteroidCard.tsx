'use client';

import type { AsteroidCardData } from "@/types/asteroid";
import { TbRulerMeasure } from "react-icons/tb";
import { FiTrendingUp } from "react-icons/fi";
import { LuMoveDiagonal } from "react-icons/lu";
import { IoWarningOutline } from "react-icons/io5";
import { FavoriteItem } from "@/types/favorite";
import FavoriteToggleButton from "../shared/FavoriteToggleButton";
import { isFavoriteFromCookie } from "@/lib/favorites";

interface AsteroidCardProps {
  asteroid: AsteroidCardData;
  favCookie: string;
}

function formatDistanceKm(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M km`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}k km`;
  }

  return `${Math.round(value)} km`;
}

function formatVelocity(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k km/h`;
  }

  return `${Math.round(value)} km/h`;
}

function getSizeBadgeClasses(sizeLabel: AsteroidCardData["sizeLabel"]) {
  switch (sizeLabel) {
    case "Small":
      return "bg-cyan-500/15 text-cyan-400";
    case "Medium":
      return "bg-yellow-500/15 text-yellow-400";
    case "Large":
      return "bg-orange-500/15 text-orange-400";
    case "Massive":
      return "border border-red-500/40 bg-red-500/20 text-red-400";
    default:
      return "bg-gray-500/15 text-gray-300";
  }
}

export default function AsteroidCard({ asteroid, favCookie }: AsteroidCardProps) {
  const isHazardous = asteroid.hazardous;

  const favoriteItem: FavoriteItem = {
    id: asteroid.id,
    type: "asteroid",
    title: asteroid.name,
    description: `Near-Earth asteroid approaching on ${asteroid.closestApproach}`,
    date: asteroid.closestApproach,
  };

  const initialFavorite = isFavoriteFromCookie(asteroid.id, "asteroid", favCookie);

  return (
    <article
      className={[
        "group relative rounded-2xl bg-[#04070d] p-5 transition-all duration-200",
        isHazardous
          ? "border border-orange-500/30 hover:border-orange-500/50 hover:shadow-[0_0_0_1px_rgba(251,146,60,0.18)]"
          : "border border-white/10 hover:border-cyan-400/60 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.12)]",
      ].join(" ")}
    >
      <FavoriteToggleButton
        item={favoriteItem}
        initialFavorite={initialFavorite}
        size="md"
        hideUntilHover
        className="absolute right-5 top-5" />

      {isHazardous && (
        <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-orange-500/50 bg-orange-500/10 backdrop-blur-sm">
          <IoWarningOutline className="h-4 w-4 text-orange-400" />
        </div>
      )}

      <div className="mb-3">
        <h3 className="pr-20 text-xl font-semibold tracking-tight text-white">
          {asteroid.name}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${getSizeBadgeClasses(
              asteroid.sizeLabel
            )}`}
          >
            {asteroid.sizeLabel}
          </span>

          {isHazardous && (
            <span className="inline-flex rounded-full bg-orange-500/15 px-2 py-0.5 text-[11px] font-semibold text-orange-400 transition-colors duration-200 group-hover:bg-orange-500/20 group-hover:text-orange-300">
              Potentially Hazardous
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 transition-colors duration-200 group-hover:bg-cyan-500/15">
            <TbRulerMeasure className="h-4 w-4 text-cyan-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Diameter</p>
            <p className="text-sm font-semibold text-white">{asteroid.diameterMeters}m</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 transition-colors duration-200 group-hover:bg-cyan-500/15">
            <FiTrendingUp className="h-4 w-4 text-cyan-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Velocity</p>
            <p className="text-sm font-semibold text-white">
              {formatVelocity(asteroid.velocityKmH)}
            </p>
          </div>
        </div>

        <div className="col-span-2 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 transition-colors duration-200 group-hover:bg-purple-500/15">
            <LuMoveDiagonal className="h-4 w-4 text-purple-400" />
          </div>
          <div>
            <p className="text-xs text-gray-400">Miss Distance</p>
            <p className="text-sm font-semibold text-white">
              {formatDistanceKm(asteroid.missDistanceKm)}{" "}
              <span className="font-normal text-gray-400">
                ({asteroid.lunarDistance.toFixed(1)} LD)
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-white/10 pt-3 transition-colors duration-200 group-hover:border-white/15">
        <p className="text-xs text-gray-400">
          Closest approach:{" "}
          <span className="text-gray-300">{asteroid.closestApproach}</span>
        </p>
      </div>
    </article>
  );
}