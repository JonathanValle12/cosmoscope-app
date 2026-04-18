import { EventCardData } from "@/types/event"
import { FavoriteItem } from "@/types/favorite";
import { IconType } from "react-icons";
import { HiOutlineFire } from "react-icons/hi2";
import { LuCalendarDays, LuExternalLink, LuMapPin } from "react-icons/lu";
import { PiCloudLightningLight, PiMountainsLight, PiSnowflakeLight } from "react-icons/pi";
import FavoriteToggleButton from "../shared/FavoriteToggleButton";
import { isFavoriteFromCookie } from "@/lib/favorites";

interface EventCardProps {
    event: EventCardData;
    favCookie: string;
}

const CATEGORY_CONFIG: Record<string, { icon: IconType; border: string; iconBg: string; iconColor: string; badge: string}> = {
    Wildfires: { icon: HiOutlineFire, border: "border-orange-500/40 hover:border-orange-400/70", iconBg:"bg-orange-500/10", iconColor: "text-orange-400",
        badge: "bg-orange-500/15 text-orange-400" },
    "Severe Storms": { icon: PiCloudLightningLight, border: "border-purple-500/40 hover:border-purple-400/70", iconBg: "bg-purple-500/10", iconColor: "text-purple-400",
        badge: "bg-purple-500/15 text-purple-400" },
    "Volcanic Activity": { icon: PiMountainsLight, border: "border-red-500/40 hover:border-red-400/70", iconBg: "bg-red-500/10", iconColor: "text-red-400",
        badge: "bg-red-500/15 text-red-400",}, 
    "Sea & Lake Ice": { icon: PiSnowflakeLight, border: "border-cyan-500/40 hover:border-cyan-400/70", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400",
        badge: "bg-cyan-500/15 text-cyan-400" },
    default: { icon: HiOutlineFire, border: "border-blue-500/40 hover:border-blue-400/70", iconBg: "bg-blue-500/10", iconColor: "text-blue-400",
        badge: "bg-blue-500/15 text-blue-400" }
};

export default function EventCard({ event, favCookie }: EventCardProps) {
    const config = CATEGORY_CONFIG[event.category] ?? CATEGORY_CONFIG.default;
    const Icon = config.icon;

    const favoriteItem: FavoriteItem = {
        id: event.id,
        type: "event",
        title: event.title,
        description: event.locationLabel,
        date: event.formattedDate,
        href: event.sourceUrl,
    };

    const initialFavorite = isFavoriteFromCookie(event.id, "event", favCookie);

    return (
        <article className={["group relative rounded-2xl border bg-[#04070d] p-5 transition-all duration-200", config.border].join(" ")}>

            <FavoriteToggleButton 
                item={favoriteItem}
                initialFavorite={initialFavorite}
                size="sm"
                hideUntilHover
                className="absolute right-4 top-4"/>

            <div className="flex items-start gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${config.iconBg}`}>
                    <Icon className={`h-5 w-5 ${config.iconColor}`} />
                </div>

                <div className="min-w-0">
                    <h3 className="pr-8 text-[18px] font-semibold leading-tight text-white">{event.title}</h3>
                    <span className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${config.badge}`}>{event.category}</span>
                </div>
            </div>

            {event.locationLabel && (
                <p className="mt-4 line-clamp-2 text-[14px] text-gray-400">{event.locationLabel}</p>
            )}

            <div className="mt-4 space-y-2.5 text-[14px] text-gray-400">
                <div className="flex items-center gap-2">
                    <LuCalendarDays className="h-4 w-4 shrink-0" />
                    <span>{event.formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                    <LuMapPin className="h-4 w-4 shrink-0" />
                    <span>{event.latitude.toFixed(2)}°, {event.longitude.toFixed(2)}°</span>
                </div>
            </div>

            {event.sourceUrl && (
                <a href={event.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-cyan-400 transition-colors hover:text-cyan-300">
                    <span className="underline-offset-4 hover:underline">View source</span>
                    <LuExternalLink className="h-4 w-4" />
                </a>
            )}
        </article>
    )
}