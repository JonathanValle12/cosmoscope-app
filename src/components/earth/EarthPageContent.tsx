import { TbWorld } from "react-icons/tb"

export default function EarthPageContent() {
    return (
        <section className="min-h-screen" aria-labelledby="explorer-title">
            <header className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
                        <TbWorld  className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                    </div>

                    <h2 className="text-3xl font-semibold tracking-tight text-white">Earth View</h2>
                </div>
                <p className="text-gray-400 text-mx">Real Images of Earth captured by NASA's EPIC camera on the DSCOVR satellite</p>
            </header>
        </section>
    )
}