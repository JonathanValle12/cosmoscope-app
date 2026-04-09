import { BiRocket } from "react-icons/bi"
import { StatCard } from "./StatCard"
import { GiFlame } from "react-icons/gi"
import { ImImage } from "react-icons/im"
import { HiOutlineGlobeAlt } from "react-icons/hi2"

interface QuickStatsProps {
    asteroidCount: number
    eventCount: number,
    imageCount: number
    earthDate: string,
}

export function QuickStats({ asteroidCount, eventCount, earthDate }: QuickStatsProps) {

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                title="Near-Earth Asteroids"
                value={asteroidCount}
                subtitle="Approaching today"
                icon={BiRocket} />
            <StatCard
                title="Active Events"
                value={eventCount}
                subtitle="Natural phenomena"
                icon={GiFlame}
                iconClassName="text-orange-400" />
            <StatCard
                title="Earth View"
                value="EPIC"
                subtitle={earthDate}
                icon={HiOutlineGlobeAlt}
                iconClassName="text-cyan-400"
            />
            <StatCard
                title="Media Library"
                value="500K+"
                subtitle="Images & Videos"
                icon={ImImage}
                iconClassName="text-purple-400"
            />
        </div>
    )
}