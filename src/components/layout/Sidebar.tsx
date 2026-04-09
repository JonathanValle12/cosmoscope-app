import { HiOutlineRocketLaunch } from "react-icons/hi2"
import Navbar from "./Navbar"


export default function Sidebar() {
    return (
        <aside className="border-r border-white/10">
            <div className="flex items-center gap-3 text-white px-4 py-4 w-full shadow-md border-b border-gray-900 ">
                <div className="bg-cyan-500 p-2 rounded-lg flex items-center justify-center">
                    <HiOutlineRocketLaunch className="w-4 h-4 text-white"/>
                </div>
                <h2 className="font-semibold text-lg">Cosmos</h2>
            </div>

            <Navbar />
        </aside>
    )
}