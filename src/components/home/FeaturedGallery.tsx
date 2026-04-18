
import { searchNASAImages } from "@/lib/nasa/explorer";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineHeart } from "react-icons/hi2";


export default async function FeaturedGallery() {

    const [galaxies, mars] = await Promise.all([
        searchNASAImages("galaxy nebula", 1, "image"),
        searchNASAImages("mars rover surface", 1, "image")
    ])

    const galaxiesItems = galaxies.collection.items;
    const marsItems = mars.collection.items;

    function formatDate(date: string) {
        return new Date(date).toLocaleDateString("en-GB");
    }
    return (
        <div className="mt-7 space-y-8">
            <section>
                <div className="mb-4 flex justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-semibold text-white">Galaxies & Nebulae</h2>
                        <p className="mt-1 text-[15px] text-white/50">Explore the cosmic wonders of deep space</p>
                    </div>
                    <Link href="/explorer?q=galaxy" className="self-end inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300">
                        <span>View all</span>
                        <HiOutlineArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
                    {galaxiesItems.slice(0, 4).map((items) => {
                        const imageUrl = items.links?.[0]?.href || "";
                        const data = items.data[0];

                        return (
                            <article key={data.nasa_id} className="group overflow-hidden rounded-3xl border border-white/10 bg-[#030608] transition-all duration-300 hover:border-cyan-400/60">
                                <div className="relative overflow-hidden">
                                    <div className="relative h-[220px] w-full">
                                        <Image src={imageUrl} alt={data.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" priority />
                                    </div>
                                    <button type="button" aria-label="Guardar en favoritos" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#050816]/80 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:border-cyan-400 hover:text-cyan-400">
                                        <HiOutlineHeart className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <h3 className="line-clamp-1 text-[15px] font-semibold text-white">{data.title}</h3>
                                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-white/50">{data.description || "No descripción disponible."}</p>
                                    <p className="mt-2 text-sm text-cyan-300/80">{formatDate(data.date_created)}</p>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </section>

            <section>
                <div className="mb-4 flex justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-semibold text-white">Mars Exploration</h2>
                        <p className="mt-1 text-[15px] text-white/50">Images from the Red Planet</p>
                    </div>
                    <Link href="/explorer?q=galaxy" className="self-end inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300">
                        <span>View all</span>
                        <HiOutlineArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
                    {marsItems.slice(0, 4).map((items) => {
                        const imageUrl = items.links?.[0]?.href || "";
                        const data = items.data[0];

                        return (
                            <article key={data.nasa_id} className="group overflow-hidden rounded-3xl border border-white/10 bg-[#030608] transition-all duration-300 hover:border-cyan-400/60">
                                <div className="relative overflow-hidden">
                                    <div className="relative h-[220px] w-full">
                                        <Image src={imageUrl} alt={data.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw" priority />
                                    </div>
                                    <button type="button" aria-label="Guardar en favoritos" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#050816]/80 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:border-cyan-400 hover:text-cyan-400">
                                        <HiOutlineHeart className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <h3 className="line-clamp-1 text-[15px] font-semibold text-white">{data.title}</h3>
                                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-white/50">{data.description || "No descripción disponible."}</p>
                                    <p className="mt-2 text-sm text-cyan-300/80">{formatDate(data.date_created)}</p>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}