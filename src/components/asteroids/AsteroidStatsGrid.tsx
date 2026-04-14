import { AsteroidStats } from "@/types/asteroid";
import AsteroidStatCard from "./AsteroidStatCard";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { IoWarningOutline } from "react-icons/io5";
import { BiRadar } from "react-icons/bi";
import { FiCalendar } from "react-icons/fi";

interface AsteroidStatsGridProps {
    stats: AsteroidStats;
}

export default function AsteroidStatsGrid({ stats }: AsteroidStatsGridProps) {
    return (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <AsteroidStatCard
                title="Total This Week"
                value={stats.totalThisWeek}
                subtitle={"Near-Earth objects"}
                icon={HiOutlineRocketLaunch}
                iconClassName="text-cyan-400"
                iconBgClassName="bg-cyan-500/10"
            />
            <AsteroidStatCard
                title="Hazardous"
                value={stats.hazardousCount}
                subtitle="Potentially dangerous"
                icon={IoWarningOutline}
                iconClassName="text-orange-400"
                iconBgClassName="bg-orange-500/10"
            />
            <AsteroidStatCard
                title="Max Velocity"
                value={`${Math.round(stats.maxVelocityKmH / 1000)}k`}
                subtitle="km/h recorded"
                icon={BiRadar}
                iconClassName="text-cyan-400"
                iconBgClassName="bg-cyan-500/10"
            />
            <AsteroidStatCard
                title="Tracking Period"
                value={`${stats.trackingPeriodDays} Days`}
                subtitle="Monitoring window"
                icon={FiCalendar}
                iconClassName="text-purple-400"
                iconBgClassName="bg-purple-500/10"
            />
        </div>
    )
}