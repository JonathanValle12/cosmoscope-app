'use client'

import { EventCategorySectionData } from "@/types/event"
import EventCard from "./EventCard";
import { useState } from "react";

interface EventCategorySectionProps {
    section: EventCategorySectionData;
}

const INITIAL_VISIBLE = 9;
const LOAD_MORE_STEP = 9;

export default function EventCategorySection({ section }: EventCategorySectionProps) {

    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

    const visibleEvents = section.events.slice(0, visibleCount);

    const hasMore = visibleCount < section.events.length;

    return (
        <section className="space-y-5">
            <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold tracking-tight text-white">{section.title}</h2>
                <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-white/5 px-2 text-sm text-gray-400">{section.count}</span>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                {visibleEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
            {hasMore && (
                <button 
                    onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
                    className="rounded-2xl border border-white-10 px-4 py-2 text-sm text-gray-300 hover:border-cyan-400/40 hover:text-white cursor-pointer">
                    Show more
                </button>
            )}
        </section>
    )
}