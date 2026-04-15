export default function AsteroidLegend() {
    return (
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-white/10 bg-[#04070d] px-5 py-4 text-sm text-gray-400">

            {/* Hazardous */}
            <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-orange-400 shadow-[0_0_6px_rgba(251,146,60,0.6)]" />
                <span className="text-gray-300">Potentially Hazardous</span>
            </div>

            {/* Lunar Distance */}
            <div className="flex items-center gap-2">
                <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400 border border-cyan-500/20">
                    LD
                </span>
                <span className="text-gray-400">
                    Lunar Distance <span className="text-gray-500">(384,400 km)</span>
                </span>
            </div>

        </div>
    )
}