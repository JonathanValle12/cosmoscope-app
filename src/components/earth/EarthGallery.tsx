'use client';

import { EarthImageItem } from "@/types/earth";
import Image from "next/image";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiOutlineArrowTopRightOnSquare, HiOutlineHeart } from "react-icons/hi2";
import { LuCalendarDays, LuMapPin } from "react-icons/lu";
import EarthThumbnailStrip from "./EarthThumbnailStrip";

interface EarthGalleryProps {
    images: EarthImageItem[];
}

export default function EarthGallery({ images }: EarthGalleryProps) {

    const [currentIndex, setCurrentIndex] = useState(0);

    const currentImage = images[currentIndex];

    const currentImageUrl = currentImage.imageUrl;

    const goPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    if (!images.length) {
        return (
            <div className="mt-8 rounded-2xl border border-white/10 bg-[#050816] p-6 text-gray-400">
                No EPIC images available right now.
            </div>
        )
    }

    return (
        <div className="mt-8 flex flex-col items-center">
            <div className="relative w-full max-w-[750px] rounded-[28px] border border-white/10 bg-black px-6 py-6">
                <div className="absolute right-4 top-4 z-10 flex items-center gap-3">
                    <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300" aria-label="Add to favorites">
                        <HiOutlineHeart className="h-6 w-6" />
                    </button>

                    <a href={currentImageUrl} target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300" aria-label="Open image">
                        <HiOutlineArrowTopRightOnSquare className="h-6 w-6" />
                    </a>
                </div>

                <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/80 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                    aria-label="Previous image"
                >
                    <FiChevronLeft className="h-6 w-6" />
                </button>

                <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/80 transition hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                    aria-label="Next image"
                >
                    <FiChevronRight className="h-6 w-6" />
                </button>

                <div className="flex justify-center">
                    <Image
                        src={currentImageUrl}
                        alt={currentImage.caption || "Earth image from NASA EPIC"} 
                        width={720}
                        height={720}
                        className="h-auto w-full max-w-[800px] object-contain"
                        priority
                        unoptimized />
                </div>

                <div className="flex justify-center">
                    <div className="-mt-8 rounded-full border border-white/10 bg-[#050816] px-4 py-2 text-sm font-medium text-white">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>
            </div>
            <div className="mt-6 w-full max-w-[730px] space-y-4">
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <LuCalendarDays className="h-4 w-4" />
                        <span>{currentImage.formattedDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <LuMapPin className="h-4 w-4" />
                        <span>
                            {currentImage.centroid_coordinates.lat.toFixed(2)}°,{" "}
                            {currentImage.centroid_coordinates.lon.toFixed(2)}°
                        </span>
                    </div>
                </div>

                <p className="text-lg text-gray-400">
                    This image was taken by NASA&apos;s EPIC camera onboard the NOAA DSCOVR spacecraft
                </p>
                
                <EarthThumbnailStrip
                    images={images}
                    currentIndex={currentIndex}
                    onSelect={setCurrentIndex}
                />
            </div>
        </div>
    )
}