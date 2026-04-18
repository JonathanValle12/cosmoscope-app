'use client'

import { EventCategorySectionData } from "@/types/event"
import EventCard from "./EventCard";
import { useState } from "react";

interface EventCategorySectionProps {
    section: EventCategorySectionData;
    favCookie: string;
}

const INITIAL_VISIBLE = 12;
const LOAD_MORE_STEP = 15;

export default function EventCategorySection({ section, favCookie }: EventCategorySectionProps) {

    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

    const visibleEvents = section.events.slice(0, visibleCount);

    const hasMore = visibleCount < section.events.length;
    const canShowLess = visibleCount > INITIAL_VISIBLE;

    return (
        <section className="space-y-5">
            <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold tracking-tight text-white">{section.title}</h2>
                <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-white/5 px-2 text-sm text-gray-400">{section.count}</span>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                {visibleEvents.map((event) => (
                    <EventCard key={event.id} event={event} favCookie={favCookie} />
                ))}
            </div>
            {(hasMore || canShowLess) && (
                <div className="flex items-center gap-3">
                    {hasMore && (
                        <button
                            type="button"
                            onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
                            className="inline-flex items-center rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-gray-200 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white active:scale-[0.98] cursor-pointer">
                            Show more ({section.events.length - visibleCount})
                        </button>
                    )}
                    {canShowLess && (
                        <button
                            type="button"
                            onClick={() => setVisibleCount(INITIAL_VISIBLE)}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white active:scale-[0.98] cursor-pointer">
                            Show less
                        </button>
                    )}
                </div>
            )}
        </section>
    )
}