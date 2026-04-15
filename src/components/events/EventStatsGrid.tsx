import { EventStats } from "@/types/event"
import EventStatsCard from "./EventStatsCard"
import { FiActivity } from "react-icons/fi"
import { HiOutlineFire } from "react-icons/hi2"
import { PiCloudLightningLight, PiMountainsLight } from "react-icons/pi"

interface EventsStatsGridProps {
    stats: EventStats
}

export default function EventStatsGrid({ stats }: EventsStatsGridProps) {
    return (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <EventStatsCard 
                title="Active Events"
                value={stats.totalEvents}
                subtitle="In the last 30 days"
                icon={FiActivity}
                iconClassName="text-cyan-400"
                iconBgClassName="bg-cyan-500/10"
            />
            <EventStatsCard 
                title="Wildfires"
                value={stats.wildfireCount}
                subtitle="Active fires"
                icon={HiOutlineFire}
                iconClassName="text-orange-400"
                iconBgClassName="bg-orange-500/10"
            />
            <EventStatsCard 
                title="Volcanic"
                value={stats.volcanicCount}
                subtitle="Volcano activity"
                icon={PiMountainsLight}
                iconClassName="text-red-400"
                iconBgClassName="bg-red-500/10"
            />
            <EventStatsCard 
                title="Storms"
                value={stats.stormCount}
                subtitle="Severe weather"
                icon={PiCloudLightningLight}
                iconClassName="text-purple-400"
                iconBgClassName="bg-purple-500/10"
            />
        </div>
    )
}