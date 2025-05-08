"use client"

import Link from "next/link"
import { CardNavbar } from "./card-navbar"
import { navbarListMainMenu } from "./navbar-type"
import { usePathname } from "next/navigation"

export const NavbarMainMenu = () => {
    const pathname = usePathname()

    return (
        <CardNavbar headerTitle="MAIN MENU">
            {navbarListMainMenu?.map(menu => (
                <li key={menu.id} className={`${pathname === menu.url ? "bg-primary-blue rounded-md scale-110 px-2 py-1 text-white" : "text-[#90A3BF]"} flex items-center gap-x-2`}>
                    <menu.icon className="text-xl" />
                    <Link href={menu.url} className="text-md">{menu.title}</Link>
                </li>
            ))}
        </CardNavbar>
    )
}