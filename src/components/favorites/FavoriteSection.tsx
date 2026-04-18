import { FavoriteItem, FavoriteSectionData } from "@/types/favorite"
import { HiOutlinePhotograph } from "react-icons/hi"
import { HiOutlineFire, HiOutlineRocketLaunch } from "react-icons/hi2";
import FavoriteCard from "./FavoriteCard";
import { IconType } from "react-icons";

interface FavoriteSectionProps {
    section: FavoriteSectionData;
    onRemove: (id: string, type: FavoriteItem["type"]) => void;
}

const SECTION_CONFIG: Record<string, { icon: IconType; color: string}> = {
    "Images & Media": { icon: HiOutlinePhotograph, color: "text-purple-400"},
    "Asteroids": { icon: HiOutlineRocketLaunch, color: "text-cyan-400"},
    "Natural Events": { icon: HiOutlineFire, color: "text-orange-400"}
};

export default function FavoriteSection({ section, onRemove }: FavoriteSectionProps) {
    const config = SECTION_CONFIG[section.title];
    const Icon = config.icon;
    const iconColor = config.color;
    return (
        <section className="space-y-5">
            <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${iconColor}`} />
                <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
                {section.items.map((item) => (
                    <FavoriteCard key={`${item.type}-${item.id}`} item={item} onRemove={onRemove} />
                ))}
            </div>
        </section>
    )
}