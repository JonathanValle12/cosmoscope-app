import { getApod } from "@/lib/nasa/apod";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import FavoriteButton from "../favorites/FavoriteButton";
import Image from "next/image";

export default async function Hero() {

    const apod = await getApod();

    const hasImage = apod.media_type === "image" && apod.url;

    return (
        <section className="relative h-[400px] overflow-hidden rounded-[30px] border border-white/10 bg-[#030712] md:h-[340px] xl:h-[550px]">
            {hasImage ? (
                <Image src={apod.url} alt={apod.title} fill className="object-cover" priority />
            ) : (
                <div className="h-[420px] w-full bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_35%),linear-gradient(180deg,_rgba(255,255,255,0.10)_0%,_rgba(255,255,255,0.04)_22%,_rgba(3,7,18,0.92)_72%,_#020617_100%)]" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-10">
                <div className="max-w-3xl">
                    <div className="mb-3 flex items-center gap-3 text-sm text-white/45">
                        <span className="flex items-center gap-2">
                            <HiOutlineCalendarDays className="h-4 w-4" />
                            Astronomy Picture of the Day
                        </span>
                        <span>•</span>
                        <span>{apod.date}</span>
                    </div>

                    <h1 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl">{apod.title}</h1>

                    <p className="max-w-2xl text-base leading-6 text-white/55 line-clamp-3 md:text-[15px]">{apod.explanation}</p>
                </div>
                <div className="mb-4 shrink-0">
                    <FavoriteButton />
                </div>
            </div>
        </section>
    )
}