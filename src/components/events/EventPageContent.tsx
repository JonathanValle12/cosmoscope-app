import { HiOutlineFire } from "react-icons/hi2"

export default function EventPageContent() {
    return (
        <section className="min-h-screen" aria-labelledby="explorer-title">
            <header className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                        <HiOutlineFire  className="w-5 h-5 text-orange-400" aria-hidden="true" />
                    </div>

                    <h2 className="text-3xl font-semibold tracking-tight text-white">Natural Events</h2>
                </div>
                <p className="text-gray-400 text-mx">Track active natural events around the world using NASA's EONET data</p>
            </header>
        </section>
    )
}