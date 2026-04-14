import { HiOutlineRocketLaunch } from "react-icons/hi2";

export default function AsteroidPageHeader() {
  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
          <HiOutlineRocketLaunch className="h-5 w-5 text-cyan-400" aria-hidden="true" />
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Near-Earth Asteroids
        </h1>
      </div>

      <p className="text-gray-400">
        Track asteroids passing close to Earth this week
      </p>
    </header>
  );
}