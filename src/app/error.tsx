'use client';

import { LuArrowLeft, LuRefreshCw } from "react-icons/lu";
import { IoWarningOutline } from "react-icons/io5";
import Link from "next/link";

interface ErrorProps {
    error: Error;
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10">
                <IoWarningOutline className="h-10 w-10 text-orange-400" />
            </div>

            <p className="mt-6 text-sm font-medium uppercase tracking-widest text-orange-500/70">Error</p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Something went wrong</h1>
            <p className="mt-4 max-w-sm text-gray-400">
                {error.message || "An unexpected error occurred. Please try again."}
            </p>

            <div className="mt-8 flex items-center gap-3">
                <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-5 py-2.5 text-sm text-orange-400 transition hover:border-orange-400/50 hover:text-orange-300 cursor-pointer">
                    <LuRefreshCw className="h-4 w-4" />
                    Try again
                </button>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-gray-300 transition hover:border-white/20 hover:text-white">
                    <LuArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>
            </div>
        </div>
    );
}