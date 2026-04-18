import Link from "next/link";
import { LuArrowLeft, LuSearchX } from "react-icons/lu";

export default function NotFound() {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
                <LuSearchX className="h-10 w-10 text-gray-400" />
            </div>

            <p className="mt-6 text-sm font-medium uppercase tracking-widest text-gray-500">404</p>
            <h1 className="mt-2 text-4xl font-semibold text-white">Page not found</h1>
            <p className="mt-4 max-w-sm text-gray-400">
                This page doesn&apos;t exist or has been moved to another location.
            </p>

            <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-gray-300 transition hover:border-cyan-400/40 hover:text-cyan-300">
                <LuArrowLeft className="h-4 w-4" />
                Back to home
            </Link>
        </div>
    );
}