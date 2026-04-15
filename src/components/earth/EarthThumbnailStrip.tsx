'use client';

import { EarthImageItem } from "@/types/earth";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface EarthThumbnailStripProps {
    images: EarthImageItem[];
    currentIndex: number;
    onSelect: (index: number) => void;
}

export default function EarthThumbnailStrip({
    images,
    currentIndex,
    onSelect,
}: EarthThumbnailStripProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const activeChild = container.children[currentIndex] as HTMLElement | undefined;
        if (!activeChild) return;

        // Mantener la primera imagen al inicio
        if (currentIndex === 0) {
            container.scrollTo({ left: 0, behavior: "auto" });
            return;
        }

        const containerRect = container.getBoundingClientRect();
        const childRect = activeChild.getBoundingClientRect();

        const targetLeft = childRect.left - containerRect.left + container.scrollLeft - (container.clientWidth - childRect.width) / 2;

        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        const clampedLeft = Math.max(0, Math.min(targetLeft, maxScrollLeft));

        container.scrollTo({
            left: clampedLeft,
            behavior: "smooth",
        });
    }, [currentIndex]);

    return (
        <div
            ref={containerRef}
            className="flex gap-3 overflow-x-auto px-2 pb-2 custom-scroll">
            {images.map((image, index) => {
                const isActive = index === currentIndex;

                return (
                    <button
                        key={image.identifier}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => onSelect(index)}
                        aria-label={`Show Earth image ${index + 1}`}
                        className="shrink-0">
                        <div
                            className={[
                                "flex h-[74px] w-[74px] items-center justify-center rounded-2xl border bg-[#04070d] p-2 transition-all duration-200",
                                isActive
                                    ? "border-cyan-400 shadow-[0_0_0_1px_rgba(34,211,238,0.18),0_0_14px_rgba(34,211,238,0.10)]"
                                    : "border-white/10 hover:border-cyan-400/40",
                            ].join(" ")}>
                            <Image
                                src={image.imageUrl}
                                alt={image.caption || `Earth thumbnail ${index + 1}`}
                                width={56}
                                height={56}
                                className={[
                                    "h-[56px] w-[56px] rounded-full object-cover transition-all duration-200",
                                    isActive ? "ring-1 ring-cyan-400/30" : "",
                                ].join(" ")}
                                priority
                                unoptimized/>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}