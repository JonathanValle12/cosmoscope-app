import { IconType } from "react-icons";


interface EventsStatsCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    icon: IconType,
    iconClassName: string;
    iconBgClassName: string;
}
export default function EventStatsCard({ title, value, subtitle, icon: Icon, iconClassName, iconBgClassName}: EventsStatsCardProps) {
    return (
        <article className="rounded-2xl border border-white/10 bg-[#04070d] p-5">
            <div className="mb-4 flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBgClassName}`}>
                    <Icon className={`h-5 w-5 ${iconClassName}`} aria-hidden="true" />
                </div>

                <h3 className="text-base text-gray-300">{title}</h3>
            </div>

            <div className="space-y-1">
                <p className="text-4xl font-semibold tracking-tight text-white">{value}</p>
                <p className="text-sm text-gray-400">{subtitle}</p>
            </div>
        </article>
    )
}