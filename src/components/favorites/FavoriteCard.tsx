import { FavoriteItem } from "@/types/favorite"
import Image from "next/image";
import { IconType } from "react-icons";
import { HiOutlinePhotograph } from "react-icons/hi";
import { HiOutlineFire, HiOutlineRocketLaunch } from "react-icons/hi2";
import { LuExternalLink, LuTrash2 } from "react-icons/lu";

interface FavoriteCardProps {
    item: FavoriteItem;
    onRemove: (id: string, type: FavoriteItem["type"]) => void;
}

const TYPE_CONFIG: Record<FavoriteItem["type"], { icon: IconType; iconBg: string; iconColor: string; labelColor: string; border: string }> = {
    image: {
        icon: HiOutlinePhotograph,
        border: "border-white/10 hover:border-purple-400/50 hover:shadow-[0_0_0_1px_rgba(192,132,252,0.12)]",
        iconBg: "bg-purple-500/10",
        iconColor: "text-purple-400",
        labelColor: "text-gray-400",
    },
    asteroid: {
        icon: HiOutlineRocketLaunch,
        border: "border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.12)]",
        iconBg: "bg-cyan-500/10",
        iconColor: "text-cyan-400",
        labelColor: "text-gray-400",
    },
    event: {
        icon: HiOutlineFire,
        border: "border-white/10 hover:border-orange-400/50 hover:shadow-[0_0_0_1px_rgba(251,146,60,0.12)]",
        iconBg: "bg-orange-500/10",
        iconColor: "text-orange-400",
        labelColor: "text-gray-400",
    }
}

export default function FavoriteCard({ item, onRemove }: FavoriteCardProps) {
    const config = TYPE_CONFIG[item.type];
    const Icon = config.icon;

    return (
        <article className={["group overflow-hidden rounded-2xl border bg-[#04070d] transition-all duration-200", config.border].join(" ")}>
            {item.imageUrl && (
                <div className="relative h-52 w-full overflow-hidden">
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        priority
                        unoptimized />
                </div>
            )}

            <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${config.iconBg}`}>
                            <Icon className={`h-4 w-4 ${config.iconColor}`} />
                        </div>
                        <span className={`text-[11px] font-medium uppercase tracking-[0.12em] ${config.labelColor}`}>{item.type}</span>
                    </div>

                    <button type="button" onClick={() => onRemove(item.id, item.type)} className="text-gray-500 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:text-white cursor-pointer" aria-label={`Remove ${item.title} from favorites`}>
                        <LuTrash2 className="h-4 w-4" />
                    </button>
                </div>

                <h3 className="text-[15px] font-semibold leading-snug text-white">{item.title}</h3>

                {item.description && (
                    <p className="mt-2 line-clamp-2 text-[13px] text-gray-400">{item.description}</p>
                )}
                {item.date && <p className="mt-3 text-[13px] text-gray-400">{item.date}</p>}

                {item.href && (
                    <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-cyan-400 transition hover:text-cyan-300">
                        <span className="underline-offset-4 group-hover/link:underline">View full size</span>
                        <LuExternalLink className="h-3.5 w-3.5" />
                    </a>
                )}
            </div>
        </article>
    )
}