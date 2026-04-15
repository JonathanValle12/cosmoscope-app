
export default function EventInfoBanner() {
    return (
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#04070d] px-5 py-4 text-sm text-gray-400">
            <span className="font-semibold text-white">EONET</span>{" "}
            <span>
                (Earth Observatory Natural Event Tracker) provides a curated source of
                continuously updated natural events metadata from NASA satellites and
                other sources.
            </span>
        </div>
    )
}