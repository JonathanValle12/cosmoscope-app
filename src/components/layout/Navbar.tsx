'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineFire, HiOutlineGlobeAlt, HiOutlineHeart, HiOutlineHome, HiOutlineMagnifyingGlass, HiOutlineRocketLaunch } from "react-icons/hi2";

export default function Navbar() {
    const links = [
        { href: "/", label: "Overview", icon: HiOutlineHome},
        { href: "/explorer", label: "Space Explorer", icon: HiOutlineMagnifyingGlass},
        { href: "/asteroids", label: "Asteroids", icon: HiOutlineRocketLaunch},
        { href: "/earth", label: "Earth View", icon: HiOutlineGlobeAlt},
        { href: "/events", label: "Natural Events", icon: HiOutlineFire},
        { href: "/favorites", label: "Favorites", icon: HiOutlineHeart}
    ]

    const pathname = usePathname();
    
    return (
        <nav aria-label="Main navigation" className="w-full mt-6">
            <ul className="flex flex-col gap-2">
                {links.map(({ href, label, icon: Icon}) => {
                    const isActive = pathname === href;
                    return (
                        <li key={href}>
                            <Link href={href} className={`flex items-center gap-3 mr-3 rounded-2xl px-4 py-2 text-base font-medium transition-colors ${isActive ? "bg-cyan-500 text-white" : "text-white/75 hover:bg-white/5 hover:text-white"}`}>
                                <Icon className="h-5 w-5 shrink-0" />
                                <span>{label}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}