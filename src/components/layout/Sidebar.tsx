import { HiOutlineRocketLaunch } from "react-icons/hi2";
import Navbar from "./Navbar";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[250px] border-r border-white/10 bg-[#020307]">
      <div className="flex w-full items-center gap-3 border-b border-gray-900 px-4 py-4 text-white shadow-md">
        <div className="flex items-center justify-center rounded-lg bg-cyan-500 p-2">
          <HiOutlineRocketLaunch className="h-4 w-4 text-white" />
        </div>
        <h2 className="text-lg font-semibold">Cosmos</h2>
      </div>

      <Navbar />
    </aside>
  );
}