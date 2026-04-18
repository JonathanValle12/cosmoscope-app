import { HiOutlineHeart } from "react-icons/hi2";

export default function FavoriteEmptyState() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
                <HiOutlineHeart className="h-10 w-10 text-gray-400" />
            </div>

            <h2 className="mt-6 text-4xl font-semibold text-white">No favorites yet</h2>
            <p className="mt-4 max-w-xl text-lg text-gray-400">
                Start exploring and save your favorite images, asteroids, and events to see them here
            </p>
        </div>
    )
}