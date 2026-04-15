import { EventCardData } from "@/types/event"
import { IconType } from "react-icons";
import { HiOutlineFire } from "react-icons/hi2";
import { LuCalendarDays, LuExternalLink, LuHeart, LuMapPin } from "react-icons/lu";
import { PiCloudLightningLight, PiMountainsLight, PiSnowflakeLight } from "react-icons/pi";

interface EventCardProps {
    event: EventCardData
}

const COLOR_STYLES: Record<
    EventCardData["accentColor"],
    {
        border: string;
        iconBg: string;
        icon: string;
        badge: string;
    }> = {
    orange: {
        border: "border-orange-500/40 hover:border-orange-400/70",
        iconBg: "bg-orange-500/10",
        icon: "text-orange-400",
        badge: "bg-orange-500/15 text-orange-400",
    },
    purple: {
        border: "border-purple-500/40 hover:border-purple-400/70",
        iconBg: "bg-purple-500/10",
        icon: "text-purple-400",
        badge: "bg-purple-500/15 text-purple-400",
    },
    cyan: {
        border: "border-cyan-500/40 hover:border-cyan-400/70",
        iconBg: "bg-cyan-500/10",
        icon: "text-cyan-400",
        badge: "bg-cyan-500/15 text-cyan-400",
    },
    red: {
        border: "border-red-500/40 hover:border-red-400/70",
        iconBg: "bg-red-500/10",
        icon: "text-red-400",
        badge: "bg-red-500/15 text-red-400",
    },
    blue: {
        border: "border-blue-500/40 hover:border-blue-400/70",
        iconBg: "bg-blue-500/10",
        icon: "text-blue-400",
        badge: "bg-blue-500/15 text-blue-400",
    }
}

const CATEGORY_ICONS: Record<string, IconType> = {
    Wildfires: HiOutlineFire,
    "Severe Storms": PiCloudLightningLight,
    "Volcanic Activity": PiMountainsLight,
    "Sea & Lake Ice": PiSnowflakeLight,
}

export default function EventCard({ event }: EventCardProps) {
    const accent = COLOR_STYLES[event.accentColor];
    const Icon = CATEGORY_ICONS[event.category] ?? HiOutlineFire;

    return (
        <article className={["group relative rounded-2xl border bg-[#04070d] p-5 transition-all duration-200", accent.border].join(" ")}>
            <button type="button" aria-label={`Add ${event.title} to favorites`} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300">
                <LuHeart className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${accent.iconBg}`}>
                    <Icon className={`h-5 w-5 ${accent.icon}`} />
                </div>

                <div className="min-w-0">
                    <h3 className="pr-8 text-[18px] font-semibold leading-tight text-white">{event.title}</h3>
                    <span className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${accent.badge}`}>{event.category}</span>
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